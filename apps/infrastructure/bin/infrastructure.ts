#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { RdsStack } from '../lib/database-stack-iam';
import { EcsStack } from '../lib/deploy-stack-iam';

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
