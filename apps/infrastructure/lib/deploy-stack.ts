import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import { Construct } from 'constructs';
import * as path from 'path';
import * as fs from 'fs';


export class DeployDockerFromHubStack extends Stack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // Read and parse the keystone.env file
    const envFilePath = path.resolve(__dirname, '../../envs/compose/keystone.env');
    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');

    // Parse the env file content into key-value pairs
    const envVariables = this.parseEnvFile(envFileContent);

    const databaseUrl = envVariables['DATABASE_URL'];
    const redisUrl = envVariables['REDIS_URL'];
    const sessionSecret = envVariables['SESSION_SECRET'];
    const allowRolesManagement = envVariables['ALLOW_ROLES_MANAGEMENT'];
    const nodeEnv = envVariables['NODE_ENV'];
    const vpcId = envVariables['VPC_ID'];
    const rdsSecurityGroupId = envVariables['RDS_SECURITY_GROUP_ID'];

    if (!databaseUrl) {
      throw new Error('Required environment variables are missing in keystone.env');
    }

    // Import existing VPC
    const vpc = ec2.Vpc.fromLookup(this, 'ImportedVPC', { vpcId });

    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'TurboCluster', {
      vpc,
    });

    // Add EC2 instances to the cluster using an Auto Scaling group
    cluster.addCapacity('ExtraCapacityGroup', {
      instanceType: new ec2.InstanceType('t2.micro'),
      minCapacity: 1,
      maxCapacity: 1,
      desiredCapacity: 1,
      machineImage: new ec2.AmazonLinuxImage(),
    });

    // Create ECS task definition for EC2
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TurboTaskDef', {
      networkMode: ecs.NetworkMode.BRIDGE,
    });

    // Add container to the task definition with environment variables
    taskDefinition.addContainer('TurboContainer', {
      image: ecs.ContainerImage.fromRegistry('drboria/turbo:latest'),
      memoryLimitMiB: 1024,
      environment: {
        DATABASE_URL: databaseUrl,
        REDIS_URL: redisUrl,
        SESSION_SECRET: sessionSecret,
        ALLOW_ROLES_MANAGEMENT: allowRolesManagement,
        NODE_ENV: nodeEnv,
      },
    });

    // Deploy the ECS EC2 service
    new ecs.Ec2Service(this, 'TurboEc2Service', {
      cluster,
      taskDefinition,
      desiredCount: 1,
    });

    // Allow the EC2 instances to connect to the RDS instance
    const rdsSecurityGroup = ec2.SecurityGroup.fromSecurityGroupId(
      this,
      'RdsSecurityGroup',
      rdsSecurityGroupId
    );

    const ecsSecurityGroup = new ec2.SecurityGroup(this, 'EcsSecurityGroup', {
      vpc,
    });

    // Allow the ECS instances to connect to the RDS instance on port 5432
    rdsSecurityGroup.addIngressRule(ecsSecurityGroup, ec2.Port.tcp(5432), 'Allow ECS EC2 to RDS');

    new cdk.CfnOutput(this, 'ClusterName', {
      value: cluster.clusterName,
    });
  }

  // Helper function to parse .env file content into key-value pairs
  private parseEnvFile(content: string): { [key: string]: string } {
    const lines = content.split('\n');
    const envVariables: { [key: string]: string } = {};

    lines.forEach(line => {
      line = line.trim();
      if (line && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          envVariables[key.trim()] = value.trim();
        }
      }
    });

    return envVariables;
  }
}
