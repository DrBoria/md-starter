import * as path from 'path';
import { FEATURES, ComponentDef } from '../config/features';
import { remove } from '../utils/filesystem';
import { updatePackageJsonIfChanged, removeDependencies } from '../utils/manifest';

/**
 * Prunes the Monorepo Root based on selected features.
 */
export async function pruneMonorepo(targetRoot: string, selectedFeatureIds: string[]) {
    console.log('✂️ Pruning monorepo...');

    // 1. Identify what to remove
    const featuresToRemove = FEATURES.filter(f => !selectedFeatureIds.includes(f.id));

    // 2. Remove Files / Folders
    for (const feature of featuresToRemove) {
        for (const relPath of feature.filesToRemove) {
            const absolutePath = path.join(targetRoot, relPath);
            await remove(absolutePath);
            console.log(`   Deleted: ${relPath}`);
        }
    }

    // 3. Clean Root package.json
    const pkgPath = path.join(targetRoot, 'package.json');
    const keysToRemove = new Set(featuresToRemove.flatMap(f => f.packageJsonKeys));

    await updatePackageJsonIfChanged(pkgPath, (pkg) => {
        return removeDependencies(pkg, keysToRemove);
    });
}

/**
 * Prunes the Shared Component Library (packages/components)
 */
export async function pruneComponentLibrary(componentsDir: string, selectedComponents: ComponentDef[], allComponents: ComponentDef[]) {
    console.log('🎨 Sculpting component library...');

    // 1. Determine what to remove
    const selectedIds = new Set(selectedComponents.map(c => c.id));
    const componentsToRemove = allComponents.filter(c => !selectedIds.has(c.id));

    // 2. Remove Component Files
    for (const comp of componentsToRemove) {
        for (const file of comp.files) {
            const absPath = path.join(componentsDir, file);
            await remove(absPath);
        }
    }

    // 3. Clean dependencies in packages/components/package.json
    const pkgPath = path.join(componentsDir, 'package.json');

    // Logic: Remove if in 'componentsToRemove' AND NOT in 'selectedComponents'
    const depsToRemove = new Set(componentsToRemove.flatMap(c => c.dependencies));
    const depsToKeep = new Set(selectedComponents.flatMap(c => c.dependencies));

    await updatePackageJsonIfChanged(pkgPath, (pkg) => {
        return removeDependencies(pkg, depsToRemove, depsToKeep);
    });
}
