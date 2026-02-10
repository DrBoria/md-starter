import * as path from 'path';
import * as fs from 'fs-extra';
import { remove } from '../../utils/filesystem';
import { getTemplatePath } from '../../utils/paths';

import { FEATURES } from '../../config/features';
import chalk from 'chalk';

export async function prunePackages(monorepoRoot: string, neededFeatures: Set<string>) {
    const packagesDir = path.join(monorepoRoot, 'packages');
    if (!await fs.pathExists(packagesDir)) return;

    const featureIdToDirs = new Map<string, string[]>();
    for (const f of FEATURES) {
        const dirs = f.filesToRemove
            .filter(p => p.startsWith('packages/'))
            .map(p => p.replace('packages/', ''));
        featureIdToDirs.set(f.id, dirs);
    }

    const dirsToRemove: string[] = [];
    featureIdToDirs.forEach((dirs, featureId) => {
        if (!neededFeatures.has(featureId)) {
            // console.log(chalk.dim(`   [Sculptor] Feature '${featureId}' unused. Pruning: ${dirs.join(', ')}`));
            dirsToRemove.push(...dirs);
        }
    });

    for (const dir of dirsToRemove) {
        const fullPath = path.join(packagesDir, dir);
        if (await fs.pathExists(fullPath)) {
            await remove(fullPath);
            console.log(chalk.dim(`   Deleted package: packages/${dir}`));
        }
    }
}

export async function pruneComponentGroups(monorepoRoot: string, neededGroups: Set<string>) {
    const componentsDir = path.join(monorepoRoot, 'packages', 'components');
    if (!await fs.pathExists(componentsDir)) return;

    const entries = await fs.readdir(componentsDir, { withFileTypes: true });
    const groupDirs = entries.filter(e => e.isDirectory());

    for (const dir of groupDirs) {
        if (!neededGroups.has(dir.name)) {
            await remove(path.join(componentsDir, dir.name));
            console.log(chalk.dim(`   Deleted component group: packages/components/${dir.name}`));
            continue;
        }

        const groupPath = path.join(componentsDir, dir.name);
        const categoryEntries = await fs.readdir(groupPath, { withFileTypes: true });
        const categoryDirs = categoryEntries.filter(e => e.isDirectory());

        for (const cat of categoryDirs) {
            if (!neededGroups.has(cat.name)) {
                await remove(path.join(groupPath, cat.name));
                console.log(chalk.dim(`   Deleted category: packages/components/${dir.name}/${cat.name}`));
            }
        }
    }
}

export async function pruneSectionGroups(monorepoRoot: string, neededGroups: Set<string>) {
    const sectionsDir = path.join(monorepoRoot, 'packages', 'sections');
    if (!await fs.pathExists(sectionsDir)) return;

    const entries = await fs.readdir(sectionsDir, { withFileTypes: true });
    const groupDirs = entries.filter(e => e.isDirectory());

    for (const dir of groupDirs) {
        if (!neededGroups.has(dir.name)) {
            await remove(path.join(sectionsDir, dir.name));
            console.log(chalk.dim(`   Deleted section group: packages/sections/${dir.name}`));
        }
    }
}

export async function pruneInfrastructure(monorepoRoot: string, neededFolders: Set<string>) {
    const infraSrcDir = path.join(monorepoRoot, 'packages/infrastructure/src');

    if (!await fs.pathExists(infraSrcDir)) return;

    const items = await fs.readdir(infraSrcDir, { withFileTypes: true });

    // We only prune specific provider folders: aws, gcp, azure, custom.
    // We keep index.ts, interfaces.ts etc.
    const knownProviders = ['aws', 'gcp', 'azure', 'custom'];

    for (const item of items) {
        if (!item.isDirectory()) continue;

        if (knownProviders.includes(item.name) && !neededFolders.has(item.name)) {
            console.log(chalk.blue(`   [Sculptor] Pruning unused infrastructure provider: ${item.name}`));
            await remove(path.join(infraSrcDir, item.name));
        }
    }
}

export async function updateInfrastructureIndex(monorepoRoot: string, neededFolders: Set<string>) {
    const infraIndexRelPath = 'packages/infrastructure/src/index.ts';
    const targetPath = path.join(monorepoRoot, infraIndexRelPath);
    const sourcePath = path.join(getTemplatePath('root'), infraIndexRelPath);

    if (!await fs.pathExists(targetPath) && !await fs.pathExists(sourcePath)) return;

    // Read from template to get full list of exports
    const content = await fs.readFile(sourcePath, 'utf-8');
    const lines = content.split('\n');
    const knownProviders = ['aws', 'gcp', 'azure', 'custom'];

    const newLines = lines.filter(line => {
        // Check for export * from './folder/...'
        const match = line.match(/from ['"]\.\/([^/]+)\//);
        if (match) {
            const folder = match[1];
            if (knownProviders.includes(folder) && !neededFolders.has(folder)) {
                return false; // Prune
            }
        }
        return true;
    });

    await fs.writeFile(targetPath, newLines.join('\n'));
    console.log(chalk.dim(`   [Sculptor] Updated packages/infrastructure/src/index.ts`));
}
