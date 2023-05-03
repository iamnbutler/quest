import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { Configuration, OpenAIApi } from 'openai';
import { inspect } from 'util';
import dotenv from 'dotenv';
import { sql } from '@vercel/postgres';
import { encode } from 'gpt-tokenizer';

dotenv.config();

interface WalkOptions {
    ignore?: string[];
}

function walk(dir: string, options: WalkOptions | undefined): string[] {
    const markdownFiles: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (options?.ignore && options.ignore.includes(entry.name)) {
            continue;
        }

        if (entry.isDirectory()) {
            markdownFiles.push(...walk(fullPath, options));
        } else if (entry.isFile() && path.extname(fullPath) === '.md') {
            markdownFiles.push(fullPath);
        }
    }

    return markdownFiles;
}

function createChecksum(content: string): string {
    const hash = crypto.createHash('md5');
    hash.update(content);
    return hash.digest('hex');
}

function sliceFileIntoSections(content: string): string[] {
    const sections: string[] = [];
    const sectionRegExp = /(^#{1,6}\s.*$)/gm;
    let lastIndex = 0;

    content.replace(sectionRegExp, (match, _, offset) => {
        if (lastIndex > 0) {
            sections.push(content.slice(lastIndex, offset).trim());
        }
        lastIndex = offset;
        return match;
    });

    sections.push(content.slice(lastIndex).trim());

    return sections;
}

function getTokenCount(text: string) {
    const tokens = encode(text)
    return tokens.length
}


async function generateEmbeddings(string: string) {
    const configuration = new Configuration({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });

    if (!configuration.apiKey) {
        throw new Error("No OpenAI API key found");
    }

    const openai = new OpenAIApi(configuration);

    const input = string.replace(/\n/g, ' ');

    const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input
    });

    if (embeddingResponse.status !== 200) {
        throw new Error(inspect(embeddingResponse.data, false, 2));
    }

    const [responseData] = embeddingResponse.data.data;

    return responseData
}

interface FileInfo {
    id?: number;
    path: string;
    checksum: string;
    content: string;
    sections: string[];
}

interface WorldSection {
    id?: number;
    world_id?: number;
    content: string;
    token_count: number;
    embedding: number[];
}

async function processMarkdown(
    directoryPath: string,
    options?: WalkOptions
): Promise<string[]> {
    const dirPath = `${__dirname}/../${directoryPath}` as const;
    const mdFiles = walk(dirPath, options);

    for (const file of mdFiles) {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            const checksum = createChecksum(content);
            const sections = sliceFileIntoSections(content);

            const fileInfo: FileInfo = {
                path: file,
                checksum,
                content,
                sections,
            };

            const buildWorldSections = sections.map(async (section) => {
                const tokenCount = getTokenCount(section)
                const e = await generateEmbeddings(section)

                // Create a WorldSection object for each section
                const worldSection: WorldSection = {
                    content: section,
                    token_count: tokenCount,
                    embedding: e.embedding,
                };

                return worldSection;
            });

            const sectionInfo = await Promise.all(buildWorldSections);

            addToDatabase(fileInfo, sectionInfo).catch((error) => console.error(error));
        } catch (err) {
            console.error(err);
        }
    }

    return mdFiles;
}

async function addToDatabase(fileInfo: FileInfo, sectionInfo: WorldSection[]) {
    const worldPath = fileInfo.path;
    const worldContent = fileInfo.content;
    const worldChecksum = fileInfo.checksum;

    // Check if the world record already exists
    const existingWorldResult = await sql`
        SELECT id FROM world WHERE path = ${worldPath}
    `;

    let worldId;

    // If the world record exists, update it; otherwise, insert a new record
    if (existingWorldResult.rowCount > 0) {
        worldId = existingWorldResult.rows[0].id;
        await sql`
            UPDATE world SET content = ${worldContent}, checksum = ${worldChecksum}
            WHERE id = ${worldId}
        `;
    } else {
        const worldInsertResult = await sql`
            INSERT INTO world (path, content, checksum)
            VALUES (${worldPath}, ${worldContent}, ${worldChecksum})
            RETURNING id
        `;
        worldId = worldInsertResult.rows[0].id;
    }

    // Insert data into the world_sections table
    for (const section of sectionInfo) {
        const sectionContent = section.content;
        const tokenCount = section.token_count;
        const embeddings = section.embedding;
        const embeddingsLiteral = `[${embeddings.join(',')}]`;

        await sql`
            INSERT INTO world_sections (world_id, content, token_count, embedding)
            VALUES (${worldId}, ${sectionContent}, ${tokenCount}, ${embeddingsLiteral})
        `;
    }
}

processMarkdown('world', {
    ignore: ['textgenerator', 'Prompt Context.md']
});

export { processMarkdown };
