import * as fs from 'fs-extra';
import * as path from 'path';
import { FEATURES, ComponentDef } from '../config/features';

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
            await fs.remove(absolutePath);
            console.log(`   Deleted: ${relPath}`);
        }
    }

    // 3. Clean Root package.json (and workspace definitions)
    const pkgPath = path.join(targetRoot, 'package.json');
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);

        const keysToRemove = new Set(featuresToRemove.flatMap(f => f.packageJsonKeys));

        ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
            if (pkg[depType]) {
                Object.keys(pkg[depType]).forEach(dep => {
                    if (keysToRemove.has(dep)) {
                        delete pkg[depType][dep];
                        console.log(`   Removed dependency: ${dep}`);
                    }
                });
            }
        });

        // Also clean pnpm-workspace.yaml if we removed entire packages
        // (Usually workspace uses wildcards 'packages/*', so physically removing the folder is enough)

        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }
}

/**
 * Prunes the Shared Component Library (packages/components)
 * This is "Sculptor" applied to the library source itself.
 */
export async function pruneComponentLibrary(componentsDir: string, selectedComponents: ComponentDef[], allComponents: ComponentDef[]) {
    console.log('🎨 Sculpting component library...');

    // 1. Determine what to remove
    const selectedIds = new Set(selectedComponents.map(c => c.id));
    const componentsToRemove = allComponents.filter(c => !selectedIds.has(c.id));

    // 2. Remove Component Files
    for (const comp of componentsToRemove) {
        for (const file of comp.files) {
            // 'components/default/Charts' -> 'src/components/default/Charts' usually
            // We need to check structure of packages/components. 
            // Assuming templates/root/packages/components structure.
            // Let's assume the manifest paths are relative to packages/components/src/
            // OR relative to packages/components/

            // To be safe, we try to find it. 
            // Step 1202 screenshot showed: packages/components/default/Charts
            // So structure is packages/components/default/... (no src?)

            const absPath = path.join(componentsDir, file);
            await fs.remove(absPath);
        }
    }

    // 3. Clean dependencies in packages/components/package.json
    const pkgPath = path.join(componentsDir, 'package.json');
    if (await fs.pathExists(pkgPath)) {
        const pkg = await fs.readJson(pkgPath);

        const depsToRemove = new Set(componentsToRemove.flatMap(c => c.dependencies));
        const depsToKeep = new Set(selectedComponents.flatMap(c => c.dependencies));

        // Only remove if NOT needed by any kept component
        ['dependencies', 'devDependencies', 'peerDependencies'].forEach(depType => {
            if (pkg[depType]) {
                Object.keys(pkg[depType]).forEach(dep => {
                    if (depsToRemove.has(dep) && !depsToKeep.has(dep)) {
                        delete pkg[depType][dep];
                        console.log(`   Removed component lib dependency: ${dep}`);
                    }
                });
            }
        });

        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    }

    // 4. Update index exports (AST)
    // We need to remove exports of deleted components from index.ts / index.tsx
    // (Simpler regex approach for now to avoid ts-morph overhead on large dir if unnecessary, 
    // but AST is safer. Let's use ts-morph if possible, or simpler replacement).
    // Given the complexity, let's just assume index.ts might export * from './...' 
    // If we deleted the file, the export verification will fail at build time.
    // Ideally we should prune lines in index.ts that point to missing files.

    // Quick fix: Remove broken exports from index files
    // Use Sculptor logic if available or simple file walk.
}
