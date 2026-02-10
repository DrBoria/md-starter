import * as path from 'path';
import { FeatureDef } from '../config/features';
import { copy, readJson } from '../utils/filesystem';
import { updatePackageJsonIfChanged, mergeDependencies } from '../utils/manifest';

/**
 * Installs a feature by copying files and merging dependencies.
 */
export async function installFeature(projectRoot: string, templateRoot: string, feature: FeatureDef) {
    // 1. Copy Files
    for (const relPath of feature.filesToRemove) {
        const sourcePath = path.join(templateRoot, relPath);
        const targetPath = path.join(projectRoot, relPath);

        // We copy if source exists. copy() utility handles existence check.
        await copy(sourcePath, targetPath);
    }

    // 2. Merge Dependencies
    // 2. Merge Dependencies
    const targetPkgPath = path.join(projectRoot, 'package.json');
    const templatePkgPath = path.join(templateRoot, 'package.json');

    await updatePackageJsonIfChanged(targetPkgPath, async (pkg) => {
        const templatePkg = await readJson(templatePkgPath);
        if (!templatePkg) return false;
        return mergeDependencies(pkg, templatePkg, feature.packageJsonKeys);
    });
}
