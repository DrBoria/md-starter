import * as path from 'path';
import * as fs from 'fs-extra';
import { copy } from '../../utils/filesystem';
import { FEATURES } from '../../config/features';
import { getTemplatePath } from '../../utils/paths';
import chalk from 'chalk';

export async function restoreFeatures(monorepoRoot: string, neededFeatures: Set<string>) {
    const rootTemplateDir = getTemplatePath('root');

    // We only restore features that are NEEDED.
    // We iterate all features, check if needed.
    // If needed, check if its files/folders exist.
    // If not, copy from root template.

    // Note: We leverage the fact that 'filesToRemove' in feature definition 
    // effectively lists the files that constitute the feature.

    for (const feature of FEATURES) {
        if (!neededFeatures.has(feature.id)) continue;

        for (const relPath of feature.filesToRemove) {
            const targetPath = path.join(monorepoRoot, relPath);
            const sourcePath = path.join(rootTemplateDir, relPath);

            // Check if missing
            if (!await fs.pathExists(targetPath)) {
                // Check if source exists (it should)
                if (await fs.pathExists(sourcePath)) {
                    console.log(chalk.blue(`   [Sculptor] Restoring missing feature '${feature.id}': ${relPath}`));
                    await copy(sourcePath, targetPath);
                } else {
                    console.warn(chalk.yellow(`   [Sculptor] Warning: Could not restore '${relPath}' for feature '${feature.id}' (not found in root template)`));
                }
            }
        }
    }
}

export async function restoreInfrastructure(monorepoRoot: string, neededFolders: Set<string>) {
    const rootTemplateDir = getTemplatePath('root');
    const infraSrcRelPath = 'packages/infrastructure/src';
    const targetSrcDir = path.join(monorepoRoot, infraSrcRelPath);
    const sourceSrcDir = path.join(rootTemplateDir, infraSrcRelPath);

    if (!await fs.pathExists(targetSrcDir)) return; // Should be restored by restoreFeatures if feature is needed

    for (const folder of Array.from(neededFolders)) {
        const targetPath = path.join(targetSrcDir, folder);
        const sourcePath = path.join(sourceSrcDir, folder);

        if (!await fs.pathExists(targetPath)) {
            if (await fs.pathExists(sourcePath)) {
                console.log(chalk.blue(`   [Sculptor] Restoring infrastructure provider '${folder}': ${path.join(infraSrcRelPath, folder)}`));
                await copy(sourcePath, targetPath);
            } else {
                console.warn(chalk.yellow(`   [Sculptor] Warning: Could not restore infra folder '${folder}' (not found in template)`));
            }
        }
    }
}
