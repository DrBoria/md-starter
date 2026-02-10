import * as path from 'path';
import { Project } from 'ts-morph';
import { collectAllNeeds } from './manifest';
import { prunePackages, pruneComponentGroups, pruneSectionGroups, pruneInfrastructure, updateInfrastructureIndex } from './directories';
import { prunePackageJson } from './deps';
import { removeNamedImports } from './imports';
import { removeJsxElements } from './jsx';
import chalk from 'chalk';

import { restoreFeatures, restoreInfrastructure } from './restore';

export { collectAllNeeds } from './manifest';
export { prunePackages, pruneComponentGroups, pruneSectionGroups, pruneInfrastructure, updateInfrastructureIndex } from './directories';
export { removeNamedImports, removeImportDeclaration, renameImport } from './imports';
export { removeJsxElements } from './jsx';
export { restoreFeatures, restoreInfrastructure } from './restore';

export async function sculptMonorepo(monorepoRoot: string) {
    console.log(chalk.dim('   [Sculptor] Analyzing monorepo needs...'));
    const needs = await collectAllNeeds(monorepoRoot);

    console.log(chalk.dim(`   [Sculptor] Union of features needed: ${Array.from(needs.features).join(', ')}`));
    console.log(chalk.dim(`   [Sculptor] Union of groups needed: ${Array.from(needs.groups).join(', ')}`));

    if (needs.features.size === 0 && needs.groups.size === 0) {
        console.warn(chalk.yellow('   [Sculptor] No needs found (no apps?). Skipping prune.'));
        return;
    }

    // Restore any needed features that might have been pruned previously
    await restoreFeatures(monorepoRoot, needs.features);

    // Restore needed infrastructure providers if they were pruned
    if (needs.features.has('infrastructure')) {
        await restoreInfrastructure(monorepoRoot, needs.infrastructureFolders);
    }

    // Prune packages/ directories not needed by any app
    await prunePackages(monorepoRoot, needs.features);

    // Prune infrastructure providers not needed
    if (needs.features.has('infrastructure')) {
        await pruneInfrastructure(monorepoRoot, needs.infrastructureFolders);
        await updateInfrastructureIndex(monorepoRoot, needs.infrastructureFolders);

    }

    // Prune workspace package.json dependencies
    await prunePackageJson(monorepoRoot, needs.features);

    // Prune component groups/categories not needed by any app
    if (needs.features.has('components')) {
        await pruneComponentGroups(monorepoRoot, needs.groups);
    } else {
        console.log(chalk.dim('   [Sculptor] "components" feature not needed, skipping component pruning (packages/components already removed via prunePackages if not needed).'));
    }

    // Prune section groups not needed by any app
    if (needs.features.has('sections')) {
        await pruneSectionGroups(monorepoRoot, needs.groups);
    }
}

export async function sculptAppImports(appDir: string, componentPkg: string, keptComponentNames: string[]) {
    const tsConfigPath = path.join(appDir, 'tsconfig.json');

    const project = new Project({ tsConfigFilePath: tsConfigPath });
    const sourceFiles = project.getSourceFiles();

    for (const sourceFile of sourceFiles) {
        const removedComponents = removeNamedImports(sourceFile, componentPkg, keptComponentNames);

        if (removedComponents.length > 0) {
            removeJsxElements(sourceFile, removedComponents);
        }
    }

    await project.save();
}
