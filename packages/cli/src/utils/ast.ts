import { Project, SourceFile, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement, Node, ImportDeclaration } from 'ts-morph';

/**
 * Creates a ts-morph Project for the given directory.
 */
export function createProject(tsConfigPath: string, skipAddingFilesFromTsConfig = false): Project {
    return new Project({
        tsConfigFilePath: tsConfigPath,
        skipAddingFilesFromTsConfig,
    });
}

/**
 * Removes named imports from a specific module declaration.
 * Returns the names of imports that were removed.
 */
export function removeNamedImports(sourceFile: SourceFile, moduleSpecifier: string, keepNames: string[]): string[] {
    const removedNames: string[] = [];
    const imports = sourceFile.getImportDeclarations();

    for (const importDecl of imports) {
        if (importDecl.getModuleSpecifierValue() === moduleSpecifier) {
            const namedImports = importDecl.getNamedImports();
            const toRemove = namedImports.filter(ni => !keepNames.includes(ni.getName()));

            for (const namedImport of toRemove) {
                removedNames.push(namedImport.getName());
                namedImport.remove();
            }

            if (importDecl.getNamedImports().length === 0) {
                importDecl.remove();
            }
        }
    }
    return removedNames;
}

/**
 * Removes JSX elements (self-closing or pair) by tag name.
 * Replaces them with 'null' to maintain syntactical validity in some contexts (like return statements).
 */
export function removeJsxElements(sourceFile: SourceFile, tagNames: string[]) {
    if (tagNames.length === 0) return;

    const nodesToRemove: Node[] = [];

    sourceFile.forEachDescendant(node => {
        // <Tag />
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
            const el = node as JsxSelfClosingElement;
            const tagName = el.getTagNameNode().getText();
            if (tagNames.includes(tagName)) {
                nodesToRemove.push(node);
            }
        }
        // <Tag>...</Tag>
        else if (node.getKind() === SyntaxKind.JsxElement) {
            // Check opening element tag name
            const el = node as any;
            const opening = el.getOpeningElement() as JsxOpeningElement;
            if (opening && tagNames.includes(opening.getTagNameNode().getText())) {
                nodesToRemove.push(node);
            }
        }
    });

    // Sort descending by position
    nodesToRemove.sort((a, b) => b.getStart() - a.getStart());

    for (const node of nodesToRemove) {
        try {
            if (!node.wasForgotten()) {
                node.replaceWithText('null');
            }
        } catch (e) {
            // console.error(`Failed to remove node: ${e}`);
        }
    }
}
