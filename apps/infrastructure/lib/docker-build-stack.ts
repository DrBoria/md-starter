import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { spawnSync } from 'child_process';
import * as path from 'path';

export class DockerStack extends cdk.Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const dockerComposeFilePath = path.resolve(__dirname, '../../../docker-compose.yml');

    // Add the DATABASE_URL to the environment file or pass it as needed
    this.runDockerCommand(['compose', '-f', dockerComposeFilePath, 'build', '--no-cache'], 'Failed to build Docker image');
    this.runDockerCommand(['tag', 'turbo:latest', 'drboria/turbo:latest'], 'Failed to tag Docker image');
    this.runDockerCommand(['push', 'drboria/turbo:latest'], 'Failed to push Docker image');
  }

  private runDockerCommand(args: string[], errorMessage: string): void {
    console.log(`Running Docker command: docker ${args.join(' ')}`);
    const result = spawnSync('docker', args);
    if (result.status !== 0) {
      console.error(`${errorMessage}: ${result.stderr.toString()}`);
      throw new Error(`${errorMessage}: ${result.stderr.toString()}`);
    }
    console.log(result.stdout.toString());
  }
}
