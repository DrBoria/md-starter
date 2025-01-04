// 1. Предварительная обработка (вне стека)
// Асинхронные вызовы (например, к AWS Secrets Manager или API) можно выполнить перед созданием стека.
// Пример:

import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';

async function getDatabaseSecret(): Promise<string> {
  // Асинхронный код для получения значения из AWS Secrets Manager
  const secretsManagerClient = new SecretsManagerClient({ region: 'eu-central-1' });
  const command = new GetSecretValueCommand({ SecretId: 'pgdbmd-connection-info' });
  const response = await secretsManagerClient.send(command);

  if (!response.SecretString) {
    throw new Error('Secret not found or invalid');
  }
  return JSON.parse(response.SecretString).DATABASE_URL;
}

async function main() {
  const databaseUrl = await getDatabaseSecret();

  const app = new cdk.App();
  new EcsStack(app, 'MyStack', { databaseUrl });
}

main();

// 2. Использование CustomResource
// Если асинхронный процесс зависит от самого стека (например, создание ресурса и получение данных о нём), используйте AWS Custom Resource.
// Пример:

import * as cdk from 'aws-cdk-lib';
import { CustomResource, Duration } from 'aws-cdk-lib';
import * as cr from 'aws-cdk-lib/custom-resources';
import { Stack } from 'aws-cdk-lib';
import * as ecs from 'aws-cdk-lib/aws-ecs';

export class MyStack extends Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const secretReader = new cr.AwsCustomResource(this, 'SecretReader', {
      onCreate: {
        service: 'SecretsManager',
        action: 'getSecretValue',
        parameters: { SecretId: 'pgdbmd-connection-info' },
        physicalResourceId: cr.PhysicalResourceId.of('pgdbmd-connection-info'),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });

    const databaseUrl = secretReader.getResponseField('SecretString');

    const taskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', { memoryLimitMiB: 512, cpu: 256 });
    taskDefinition.addContainer('MyContainer', {
      image: ecs.ContainerImage.fromRegistry('nginx'),
      environment: { DATABASE_URL: databaseUrl },
    });
  }
}

// 3. Использование контекста (cdk.json)
// Храните результаты асинхронных операций в контексте приложения. Значения загружаются до запуска стека.
// Пример загрузки контекста:

const app = new cdk.App({
    context: {
      databaseUrl: 'postgres://user:password@hostname:5432/dbname',
    },
  });
  
  new MyStack(app, 'MyStack', {
    databaseUrl: app.node.tryGetContext('databaseUrl'),
  });
  