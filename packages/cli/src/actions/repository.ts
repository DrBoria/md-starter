import * as fs from 'fs-extra';
import * as path from 'path';
import { copy, exists, remove } from '../utils/filesystem';

/**
 * Checks if a directory is empty (ignores .git etc if needed, but for now strict).
 */
export async function isDirectoryEmpty(targetDir: string): Promise<boolean> {
    if (!await exists(targetDir)) return true;
    const files = await fs.readdir(targetDir);
    return files.length === 0;
}

/**
 * Clones a template directory to a target directory.
 */
export async function cloneTemplate(templateDir: string, targetDir: string) {
    if (!await exists(templateDir)) {
        throw new Error(`Template not found at: ${templateDir}`);
    }
    await copy(templateDir, targetDir);
}

/**
 * Prepares the target directory (ensure exists).
 */
export async function prepareDirectory(targetDir: string) {
    await fs.ensureDir(targetDir);
}
