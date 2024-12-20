#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { DatabaseStack } from '../lib/database-stack';
import { DockerStack } from '../lib/docker-build-stack';
import { EcsStack } from '../lib/deploy-stack';

const app = new cdk.App();

// Create the DatabaseStack
const databaseStack = new DatabaseStack(app, 'DatabaseStack');

// Get the VPC and RDS Security Group ID from DatabaseStack
const vpc = databaseStack.vpc;
const rdsSecurityGroupId = databaseStack.rdsSecurityGroupId;

// Create the DockerStack and make it dependent on the DatabaseStack
const dockerStack = new DockerStack(app, 'DockerStack');
dockerStack.node.addDependency(databaseStack);

// Create EcsStack and pass VPC and RDS security group ID
new EcsStack(app, 'EcsStack', {
  rdsSecurityGroupId: rdsSecurityGroupId, // Pass the RDS security group ID
  vpc: vpc,  // Pass the VPC created by DatabaseStack
});
