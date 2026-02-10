import { readJson, writeJson } from './filesystem';

export type DependencyType = 'dependencies' | 'devDependencies' | 'peerDependencies';
export const DEP_TYPES: DependencyType[] = ['dependencies', 'devDependencies', 'peerDependencies'];

/**
 * Merges dependencies from a source object into a target package.json object.
 * Returns true if changes were made.
 */
export function mergeDependencies(targetPkg: any, sourcePkg: any, keysToMerge: string[]): boolean {
    let changed = false;

    for (const depType of DEP_TYPES) {
        if (sourcePkg[depType]) {
            for (const dep of Object.keys(sourcePkg[depType])) {
                if (keysToMerge.includes(dep)) {
                    if (!targetPkg[depType]) targetPkg[depType] = {};

                    if (targetPkg[depType][dep] !== sourcePkg[depType][dep]) {
                        targetPkg[depType][dep] = sourcePkg[depType][dep];
                        changed = true;
                    }
                }
            }
        }
    }
    return changed;
}

/**
 * Removes dependencies from a package.json object.
 * Returns true if changes were made.
 */
export function removeDependencies(pkg: any, keysToRemove: Set<string>, keysToKeep?: Set<string>): boolean {
    let changed = false;

    for (const depType of DEP_TYPES) {
        if (pkg[depType]) {
            Object.keys(pkg[depType]).forEach(dep => {
                if (keysToRemove.has(dep)) {
                    if (keysToKeep && keysToKeep.has(dep)) return;

                    delete pkg[depType][dep];
                    changed = true;
                }
            });
            // Cleanup empty objects? Maybe not needed strictly.
        }
    }
    return changed;
}

/**
 * Reads package.json, applies a mutation via callback, and saves ONLY if changes occurred.
 *
 * Pattern: Read -> Mutate -> Write (if changed)
 * Rationale:
 * 1. Avoids unnecessary file I/O if the operation didn't actually change anything.
 * 2. Preserves file modification timestamps if no changes were made.
 * 3. Centralizes the "read-modify-write" logic to prevent race conditions or forgotten writes.
 * 
 * @param pkgPath Absolute path to package.json
 * @param mutationCallback Function that mutates the pkg object. MUST return `true` if changes were made.
 */
export async function updatePackageJsonIfChanged(pkgPath: string, mutationCallback: (pkg: any) => boolean | Promise<boolean>) {
    const pkg = await readJson(pkgPath);
    if (!pkg) return;

    // We rely on the callback to tell us if it changed anything.
    // This is more efficient than deep comparison for large manifest files.
    const changed = await mutationCallback(pkg);

    if (changed) {
        await writeJson(pkgPath, pkg);
    }
}
