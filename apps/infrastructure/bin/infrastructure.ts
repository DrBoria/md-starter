#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { RdsStack } from '../lib/database-stack-iam';
import { Signer } from '@aws-sdk/rds-signer';
import { EcsStack } from '../lib/deploy-stack-iam';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';


async function getDatabaseSecret(): Promise<string> {
  const secretsManagerClient = new SecretsManagerClient({ region: 'eu-central-1' });

  const command = new GetSecretValueCommand({ SecretId: 'pgdbmd-connection-info' });
  const data = await secretsManagerClient.send(command);

  let secretValue;
  if (data.SecretString) {
    secretValue = JSON.parse(data.SecretString);
  } else if (data.SecretBinary) {
    const decodedBinarySecret = Buffer.from(data.SecretBinary).toString('utf-8');
    secretValue = JSON.parse(decodedBinarySecret);
  } else {
    throw new Error('Secret data is neither a valid string nor a binary string.');
  }

  const { hostname, port, username, database } = secretValue;

  const signer = new Signer({
    region: 'eu-central-1',
    hostname,
    port,
    username,
  });

  const token = await signer.getAuthToken();
  return `postgres://${username}:${encodeURIComponent(token)}@${hostname}:${port}/${database}?ssl=require`;
}

// async function main() {
  const app = new cdk.App();
  // Создаем RDS стек и получаем VPC
  const rdsStack = new RdsStack(app, 'RdsStack', {
    env: { account: '669207290457', region: 'eu-central-1' },
  });

  // const databaseUrl = await getDatabaseSecret();

  // Передаем созданную VPC в ECS стек
  const ecsStack = new EcsStack(app, 'EcsStackIAM', {
    env: { account: '669207290457', region: 'eu-central-1' },
    vpc: rdsStack.vpc, // Передаем VPC
    ec2SecurityGroup: rdsStack.ec2SecurityGroup,
    rdsOutputs: rdsStack.outputs
  });

  ecsStack.addDependency(rdsStack);
// }

// main();
