import * as path from 'path';
import { Project, SyntaxKind } from 'ts-morph';
import { DeployConfig } from '../config/deployments';
import { remove, writeFile, exists } from '../utils/filesystem';

/**
 * Configures the infrastructure package based on selected provider/strategy.
 */
export async function configureInfrastructure(targetDir: string, projectName: string, config: DeployConfig) {

    // 1. File Cleanup
    for (const file of config.filesToRemove) {
        await remove(path.join(targetDir, file));
    }

    // 2. File Creation (Config-only mode)
    if (config.filesToCreate) {
        for (const [filename, content] of Object.entries(config.filesToCreate)) {
            await writeFile(path.join(targetDir, filename), content);
        }
    }

    // 3. Infrastructure Config (CDKTF)
    if (config.type === 'cdktf' && config.importPath && config.className) {
        const infraPath = path.join(targetDir, 'infrastructure', 'main.ts');

        if (await exists(infraPath)) {
            const project = new Project({ tsConfigFilePath: path.join(targetDir, 'tsconfig.json') });
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
                const newExprs = mainFile.getDescendantsOfKind(SyntaxKind.NewExpression);
                for (const newExpr of newExprs) {
                    if (newExpr.getText().includes('DeploymentStrategy')) {
                        const args = newExpr.getArguments();
                        if (args.length >= 3) {
                            const propsArg = args[2];

                            // Logic to determine what props to inject
                            if (config.className.includes('Static')) {
                                ensureImport(mainFile, 'path');
                                propsArg.replaceWithText(`{
                                      appName: "${projectName}",
                                      distPath: path.resolve(__dirname, "../dist")
                                  }`);
                            } else if (config.className.includes('Ec2') || config.className.includes('Vm')) {
                                propsArg.replaceWithText(`{
                                      appName: "${projectName}",
                                      dockerImage: "nginx:latest", // Placeholder
                                      port: 80,
                                      instanceType: "t3.micro" 
                                  }`);
                            } else {
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
