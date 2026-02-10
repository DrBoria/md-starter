import { SourceFile } from 'ts-morph';

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

export function removeImportDeclaration(sourceFile: SourceFile, moduleSpecifier: string) {
    const imports = sourceFile.getImportDeclarations();
    for (const importDecl of imports) {
        if (importDecl.getModuleSpecifierValue() === moduleSpecifier) {
            importDecl.remove();
        }
    }
}

export function renameImport(sourceFile: SourceFile, moduleSpecifier: string, oldName: string, newName: string) {
    const imports = sourceFile.getImportDeclarations();
    for (const importDecl of imports) {
        if (importDecl.getModuleSpecifierValue() === moduleSpecifier) {
            const namedImports = importDecl.getNamedImports();
            for (const ni of namedImports) {
                if (ni.getName() === oldName) {
                    ni.setName(newName);
                }
            }
        }
    }
}
