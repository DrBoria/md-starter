import * as path from 'path';
import { FEATURES } from '../../config/features';
import { updatePackageJsonIfChanged, removeDependencies } from '../../utils/manifest';

export async function prunePackageJson(monorepoRoot: string, neededFeatures: Set<string>) {
    const pkgPath = path.join(monorepoRoot, 'package.json');

    // Identify keys to remove: those belonging to features NOT in neededFeatures
    const keysToRemove = new Set<string>();
    for (const feature of FEATURES) {
        if (!neededFeatures.has(feature.id)) {
            feature.packageJsonKeys.forEach(key => keysToRemove.add(key));
        }
    }

    if (keysToRemove.size === 0) return;

    console.log(`   Pruning package.json dependencies: ${Array.from(keysToRemove).join(', ')}`);
    await updatePackageJsonIfChanged(pkgPath, (pkg) => {
        return removeDependencies(pkg, keysToRemove);
    });
}
