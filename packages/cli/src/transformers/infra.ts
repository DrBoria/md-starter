import * as path from 'path';
import * as fs from 'fs-extra';
import { Project, SyntaxKind } from 'ts-morph';
import { RegistryConfig } from '../config/registry';

export async function configureInfrastructure(targetDir: string, projectName: string, config: RegistryConfig) {

    // 1. File Cleanup
    for (const file of config.filesToRemove) {
        const filePath = path.join(targetDir, file);
        if (await fs.pathExists(filePath)) {
            await fs.remove(filePath);
        }
    }

    // 2. File Creation (Config-only mode)
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
            let infraImport = imports.find(d => d.getModuleSpecifierValue().includes('infrastructure'));

            if (infraImport) {
                // Update Import Path
                infraImport.setModuleSpecifier(config.importPath);

                // Update Named Import
                infraImport.removeNamedImports();
                infraImport.addNamedImport({
                    name: config.className,
                    alias: 'DeploymentStrategy'
                });

                // Update Config Props logic
                // For "Static", "Container", "VM", we might need different props.
                // Assuming the template uses `new DeploymentStrategy(scope, id, { ... })`
                // We need to inject generic props or specific props based on strategy.

                const newExprs = mainFile.getDescendantsOfKind(SyntaxKind.NewExpression);
                for (const newExpr of newExprs) {
                    if (newExpr.getText().includes('DeploymentStrategy')) {
                        const args = newExpr.getArguments();
                        if (args.length >= 3) {
                            const propsArg = args[2];

                            // Logic to determine what props to inject
                            // This is slightly brittle but effective for now.

                            if (config.className.includes('Static')) {
                                // Static Props
                                ensureImport(mainFile, 'path');
                                propsArg.replaceWithText(`{
                                      appName: "${projectName}",
                                      distPath: path.resolve(__dirname, "../dist")
                                  }`);
                            } else if (config.className.includes('Ec2') || config.className.includes('Vm')) {
                                // VM Props
                                propsArg.replaceWithText(`{
                                      appName: "${projectName}",
                                      dockerImage: "nginx:latest", // Placeholder
                                      port: 80,
                                      instanceType: "t3.micro" 
                                  }`);
                            } else {
                                // Container Props (default)
                                propsArg.replaceWithText(`{
                                      appName: "${projectName}",
                                      dockerImage: "nginx:latest", // Placeholder
                                      port: 80
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

function ensureImport(sourceFile: any, moduleName: string) {
    if (!sourceFile.getImportDeclaration((d: any) => d.getModuleSpecifierValue() === moduleName)) {
        sourceFile.addImportDeclaration({
            namespaceImport: moduleName,
            moduleSpecifier: moduleName
        });
    }
}
