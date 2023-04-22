export function slugify(str: string): string {
    // Replace spaces with underscores
    str = str.replace(/\s+/g, '_');

    // Replace special characters with empty string
    str = str.replace(/[^a-zA-Z0-9-_]/g, '');

    // Return sugified string
    return str;
}
