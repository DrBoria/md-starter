import * as path from 'path';
import { Project, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement, Node } from 'ts-morph';

/**
 * The "Sculptor": Removes unused imports AND their JSX elements.
 */
export async function pruneComponents(targetDir: string, componentPkg: string, keptComponents: string[]) {
    const project = new Project({
        tsConfigFilePath: path.join(targetDir, 'tsconfig.json'),
        skipAddingFilesFromTsConfig: false,
    });

    const sourceFiles = project.getSourceFiles();

    for (const sourceFile of sourceFiles) {
        // Find Component Imports
        const imports = sourceFile.getImportDeclarations();

        for (const importDecl of imports) {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();

            if (moduleSpecifier === componentPkg) {
                const namedImports = importDecl.getNamedImports();
                const removedNames: string[] = [];

                // 1. Remove Imports
                for (const namedImport of namedImports) {
                    const name = namedImport.getName();
                    if (!keptComponents.includes(name)) {
                        removedNames.push(name);
                        namedImport.remove();
                    }
                }

                // If import list empty, remove declared import
                if (importDecl.getNamedImports().length === 0) {
                    importDecl.remove();
                }

                // 2. Remove JSX Usages of removed components
                // We search the file for JSX elements matching the removed names
                if (removedNames.length > 0) {
                    const nodesToRemove: Node[] = [];
                    sourceFile.forEachDescendant(node => {
                        // Handle <HeroVideo /> (SelfClosing)
                        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
                            const params = node as JsxSelfClosingElement;
                            const tagName = params.getTagNameNode().getText();
                            if (removedNames.includes(tagName)) {
                                nodesToRemove.push(node);
                            }
                        }
                        // Handle <HeroVideo>...</HeroVideo> (Opening/Closing)
                        else if (node.getKind() === SyntaxKind.JsxElement) {
                            // JsxElement has openingElement and closingElement
                            // We check the opening element's tag name
                            const opening = (node as any).getOpeningElement() as JsxOpeningElement;
                            if (opening && removedNames.includes(opening.getTagNameNode().getText())) {
                                nodesToRemove.push(node);
                            }
                        }
                    });

                    // Sort nodes by position (descending) to avoid invalidating indices when removing from the same file
                    nodesToRemove.sort((a, b) => b.getStart() - a.getStart());

                    for (const node of nodesToRemove) {
                        try {
                            if (!node.wasForgotten()) {
                                // console.log(`Removing node: ${node.getKindName()}`);
                                // Replace with 'null' to keep valid JSX syntax (return null, {null}, etc.)
                                // Ensure we are not removing the same node twice or a node that has become invalid
                                node.replaceWithText('null');
                            }
                        } catch (e) {
                            console.error(`Failed to remove node: ${e}`);
                        }
                    }
                }
            }
        }
    }

    await project.save();
}
