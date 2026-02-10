import * as path from 'path';
import { updatePackageJsonIfChanged } from '../utils/manifest';

/**
 * Updates the project name in package.json.
 */
export async function setProjectName(projectRoot: string, name: string) {
    const pkgPath = path.join(projectRoot, 'package.json');

    await updatePackageJsonIfChanged(pkgPath, (pkg) => {
        if (pkg.name !== name) {
            pkg.name = name;
            return true;
        }
        return false;
    });
}
