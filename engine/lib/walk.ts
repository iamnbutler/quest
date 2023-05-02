import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { slugify } from '../app/lib/slugify';

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

function getIdFromFilename(filename: string): string {
    return slugify(path.basename(filename, '.md')).toLowerCase();
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

async function processMarkdown(
    directoryPath: string,
    options?: WalkOptions
): Promise<string[]> {
    const dirPath = `${__dirname}/../${directoryPath}` as const;
    const mdFiles = walk(dirPath, options);

    for (const file of mdFiles) {
        try {
            const content = fs.readFileSync(file, 'utf-8');
            const id = getIdFromFilename(file);
            const checksum = createChecksum(content);
            const sections = sliceFileIntoSections(content);

            const fileInfo = {
                id,
                checksum,
                sections,
            };

            console.log(fileInfo);
        } catch (err) {
            console.error(err);
        }
    }

    return mdFiles;
}

processMarkdown('world', {
    ignore: ['textgenerator', 'Prompt Context.md']
});

export { processMarkdown };
