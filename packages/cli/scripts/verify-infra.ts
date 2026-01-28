import * as fs from 'fs-extra';
import * as path from 'path';
import { configureInfrastructure } from '../src/utils/infra';

async function run() {
    const tempDir = path.resolve(__dirname, '../temp-verify-infra');
    await fs.ensureDir(tempDir);

    // Setup Mock Files
    const infraDir = path.join(tempDir, 'infrastructure');
    await fs.ensureDir(infraDir);

    const mockMain = `
    import { Construct } from "constructs";
    import { App, TerraformStack } from "cdktf";
    import { AwsContainerApp as DeploymentStrategy } from "@md/infrastructure/src/constructs/aws-container"; 

    class MyStack extends TerraformStack {
      constructor(scope: Construct, id: string) {
        super(scope, id);
        const appName = "TEMPLATE_APP_NAME";
        new DeploymentStrategy(this, "deployment", {
          appName,
          dockerImage: "my-repo/image:latest", 
          port: 80
        });
      }
    }
    `;
    await fs.writeFile(path.join(infraDir, 'main.ts'), mockMain);
    await fs.writeFile(path.join(tempDir, 'Dockerfile'), 'FROM nginx');
    await fs.writeFile(path.join(tempDir, 'nginx.conf'), 'server {}');
    await fs.writeFile(path.join(tempDir, 'tsconfig.json'), '{}'); // Needed for Project

    console.log('--- BEFORE ---');
    console.log('Dockerfile exists:', await fs.pathExists(path.join(tempDir, 'Dockerfile')));

    // Execute static transformation
    console.log('Running configureInfrastructure(aws-static config)...');

    // Mock Config based on Registry
    const mockConfig = {
        type: 'cdktf' as const,
        label: 'AWS Static',
        importPath: '@md/infrastructure/dist/constructs/aws-static',
        className: 'AwsStaticSite',
        filesToRemove: ['Dockerfile', 'nginx.conf']
    };

    await configureInfrastructure(tempDir, 'test-app', mockConfig);

    console.log('--- AFTER ---');
    const mainContent = await fs.readFile(path.join(infraDir, 'main.ts'), 'utf8');

    let success = true;

    if (await fs.pathExists(path.join(tempDir, 'Dockerfile'))) {
        console.error('FAIL: Dockerfile not removed');
        success = false;
    } else {
        console.log('PASS: Dockerfile removed');
    }

    if (!mainContent.includes('AwsStaticSite')) {
        console.error('FAIL: AwsStaticSite not found in imports');
        success = false;
    } else {
        console.log('PASS: AwsStaticSite imported');
    }

    if (!mainContent.includes('distPath:')) {
        console.error('FAIL: distPath prop not found');
        success = false;
    } else {
        console.log('PASS: distPath prop injected');
    }

    if (mainContent.includes('dockerImage:')) {
        console.error('FAIL: dockerImage prop still present');
        success = false;
    } else {
        console.log('PASS: dockerImage prop removed');
    }

    console.log('\nFINAL CONTENTS of main.ts:');
    console.log(mainContent);

    // Cleanup
    await fs.remove(tempDir);

    if (!success) process.exit(1);
}

run().catch(e => {
    console.error(e);
    process.exit(1);
});
