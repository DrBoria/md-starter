import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Copies a file or directory.
 */
export async function copy(src: string, dest: string, options?: fs.CopyOptions) {
    if (await fs.pathExists(src)) {
        await fs.copy(src, dest, options);
        return true;
    }
    return false;
}

/**
 * Removes a file or directory if it exists.
 */
export async function remove(targetPath: string) {
    if (await fs.pathExists(targetPath)) {
        await fs.remove(targetPath);
        return true;
    }
    return false;
}

/**
 * Checks if a path exists.
 */
export async function exists(targetPath: string): Promise<boolean> {
    return fs.pathExists(targetPath);
}

/**
 * Writes content to a file, creating directories if needed.
 */
export async function writeFile(targetPath: string, content: string) {
    await fs.ensureDir(path.dirname(targetPath));
    await fs.writeFile(targetPath, content);
}

/**
 * Reads a JSON file.
 */
export async function readJson<T = any>(targetPath: string): Promise<T | null> {
    if (await fs.pathExists(targetPath)) {
        return fs.readJson(targetPath);
    }
    return null;
}

/**
 * Writes a JSON file.
 */
export async function writeJson(targetPath: string, content: any) {
    await fs.writeJson(targetPath, content, { spaces: 2 });
}
