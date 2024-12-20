import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';
import * as path from 'path';
import * as fs from 'fs';

interface EcsStackProps extends StackProps {
  rdsSecurityGroupId: string; // Pass the security group ID of the RDS instance
  vpc: ec2.Vpc; // VPC is passed from the DatabaseStack
}

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props: EcsStackProps) {
    super(scope, id, props);

    const { vpc, rdsSecurityGroupId } = props;

    // Read and parse the keystone.env file
    const envFilePath = path.resolve(__dirname, '../../env/composed/keystone.env');
    const envFileContent = fs.readFileSync(envFilePath, 'utf-8');

    // Parse the env file content into key-value pairs
    const envVariables = this.parseEnvFile(envFileContent);

    // Extract and parse DATABASE_URL from the environment variables
    const databaseUrl = envVariables['DATABASE_URL'];
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not found in keystone.env');
    }

    // Parse the database URL
    const urlPattern = /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^?]+)/;
    const urlMatch = databaseUrl.match(urlPattern);
    if (!urlMatch) {
      throw new Error('DATABASE_URL is not in the expected format');
    }

    const [_, username, password, host, port, dbName] = urlMatch;

    // Create ECS Cluster
    const cluster = new ecs.Cluster(this, 'TurboCluster', {
      vpc,
    });

    // Add EC2 instances to the cluster using an Auto Scaling group
    cluster.addCapacity('ExtraCapacityGroup', {
      instanceType: new ec2.InstanceType('t2.micro'),
      minCapacity: 1,  // Minimum number of instances
      maxCapacity: 1,  // Maximum number of instances
      desiredCapacity: 1,  // Desired number of instances
      machineImage: new ec2.AmazonLinuxImage(), // Use a standard AMI
    });

    // Create ECS task definition for EC2
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TurboTaskDef', {
      networkMode: ecs.NetworkMode.BRIDGE, // Network mode for EC2
    });

    // Add container to the task definition with environment variables
    taskDefinition.addContainer('TurboContainer', {
      image: ecs.ContainerImage.fromRegistry('drboria/turbo:latest'),
      memoryLimitMiB: 1024,
      environment: {
        DATABASE_HOST: host,
        DATABASE_PORT: port,
        DATABASE_NAME: dbName,
        DATABASE_USER: username,
        DATABASE_PASSWORD: password,
      },
    });

    // Deploy the ECS EC2 service
    new ecs.Ec2Service(this, 'TurboEc2Service', {
      cluster,
      taskDefinition,
      desiredCount: 1, // Only one EC2 instance
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
