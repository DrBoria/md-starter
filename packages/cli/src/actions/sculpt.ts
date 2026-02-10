import * as path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { createProject, removeNamedImports, removeJsxElements } from '../utils/ast';

/**
 * The "Sculptor": Removes unused imports AND their JSX elements from a directory.
 */
export async function pruneComponents(targetDir: string, componentPkg: string, keptComponents: string[]) {
    const project = createProject(path.join(targetDir, 'tsconfig.json'));
    const sourceFiles = project.getSourceFiles();

    for (const sourceFile of sourceFiles) {
        // removeNamedImports returns the list of removed imports
        const removedComponents = removeNamedImports(sourceFile, componentPkg, keptComponents);

        if (removedComponents.length > 0) {
            removeJsxElements(sourceFile, removedComponents);
        }
    }

    await project.save();
}

/**
 * Specific transformer for styleguide.config.js to remove unused sections.
 */
export async function pruneUiKitConfig(configPath: string, selectedPackages: string[]) {
    const project = new Project({ skipAddingFilesFromTsConfig: true });
    const sourceFile = project.addSourceFileAtPath(configPath);

    // 1. Find `sections` variable
    const sectionsVar = sourceFile.getVariableDeclaration("sections");
    if (!sectionsVar) return;

    const arrayLiteral = sectionsVar.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!arrayLiteral) return;

    // 2. Iterate elements backwards
    const elements = arrayLiteral.getElements();
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;

        const obj = element.asKind(SyntaxKind.ObjectLiteralExpression);
        const nameProp = obj?.getProperty("name");

        if (nameProp && nameProp.getKind() === SyntaxKind.PropertyAssignment) {
            const nameValue = nameProp.asKind(SyntaxKind.PropertyAssignment)
                ?.getInitializerIfKind(SyntaxKind.StringLiteral)
                ?.getLiteralValue();

            if (!nameValue) continue;

            if (nameValue.startsWith("@md/")) {
                const isSelected = selectedPackages.some(pkg => nameValue.includes(pkg));
                // Always keep @md/components by default unless logic changes
                if (!isSelected && nameValue !== "@md/components") {
                    arrayLiteral.removeElement(i);
                }
            }
        }
    }

    await sourceFile.save();
}
