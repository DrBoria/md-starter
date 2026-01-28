import * as path from 'path';
import * as fs from 'fs-extra';
import { Project, SyntaxKind } from 'ts-morph';
import { DeployConfig } from '../config/deployments';

export async function configureInfrastructure(targetDir: string, projectName: string, config: DeployConfig) {

    // 1. File Cleanup
    for (const file of config.filesToRemove) {
        const filePath = path.join(targetDir, file);
        if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
        }
    }

    // 2. File Creation (Config-only mode or extra configs)
    if (config.filesToCreate) {
        for (const [filename, content] of Object.entries(config.filesToCreate)) {
            await fs.writeFile(path.join(targetDir, filename), content);
        }
    }

    // 3. Infrastructure Config (CDKTF)
    if (config.type === 'cdktf' && config.importPath && config.className) {
        const infraPath = path.join(targetDir, 'infrastructure', 'main.ts');

        if (await fs.pathExists(infraPath)) {
            const project = new Project({
                tsConfigFilePath: path.join(targetDir, 'tsconfig.json'),
                skipAddingFilesFromTsConfig: false,
            });
            const mainFile = project.addSourceFileAtPath(infraPath);

            const imports = mainFile.getImportDeclarations();
            // Find any import from '@md/infrastructure...' or constructs
            let infraImport = imports.find(d => d.getModuleSpecifierValue().includes('infrastructure'));

            if (infraImport) {
                // Update Import Path
                infraImport.setModuleSpecifier(config.importPath);

                // Update Named Import
                // We assume the template uses `DeploymentStrategy` as alias.
                infraImport.removeNamedImports();
                infraImport.addNamedImport({
                    name: config.className,
                    alias: 'DeploymentStrategy'
                });

                // B. Update Config Arguments
                // We detect "Static" intent via class name or special flag.
                // Assuming "Static" constructs need distPath.

                const isStatic = config.className.includes('Static');

                if (isStatic) {
                    const newExprs = mainFile.getDescendantsOfKind(SyntaxKind.NewExpression);

                    for (const newExpr of newExprs) {
                        const text = newExpr.getText();
                        if (text.includes('DeploymentStrategy')) {
                            const args = newExpr.getArguments();
                            if (args.length >= 3) {
                                const propsArg = args[2];

                                // Add `import * as path from 'path'` if missing
                                if (!mainFile.getImportDeclaration(d => d.getModuleSpecifierValue() === 'path')) {
                                    mainFile.addImportDeclaration({
                                        namespaceImport: 'path',
                                        moduleSpecifier: 'path'
                                    });
                                }

                                propsArg.replaceWithText(`{
                                    appName: "${projectName}",
                                    distPath: path.resolve(__dirname, "../dist")
                                }`);
                            }
                        }
                    }
                }
            }

            // General text replacement for App Name
            let fullText = mainFile.getFullText();
            fullText = fullText.replace(/TEMPLATE_APP_NAME/g, projectName);
            mainFile.replaceWithText(fullText);

            await project.save();
        }
    }
}
