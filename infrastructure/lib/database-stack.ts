import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { Construct } from 'constructs';
import * as fs from 'fs/promises';
import * as path from 'path';

export class DatabaseStack extends Stack {
  public readonly vpc: ec2.Vpc; // Expose VPC
  public readonly rdsSecurityGroupId: string; // Expose RDS Security Group ID

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a VPC for RDS
    this.vpc = new ec2.Vpc(this, 'TurboVpc', {
      maxAzs: 2,
    });

    // Option with adequate generated sicret
    // const dbSecret = new secretsmanager.Secret(this, 'DbSecret', {
    //   secretName: 'TurboPostgresCredentials',
    //   generateSecretString: {
    //     secretStringTemplate: JSON.stringify({ username: 'postgres' }),
    //     generateStringKey: 'password',
    //     excludeCharacters: '"@/',
    //     passwordLength: 12,
    //   },
    // });


    // Create the RDS PostgreSQL instance
    const database = new rds.DatabaseInstance(this, 'TurboPostgresInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
      vpc: this.vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T4G, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromPassword('postgres', cdk.SecretValue.plainText('password123sjkdflkj!')),
      databaseName: 'pgdb',
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 25,
      publiclyAccessible: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
    });

    this.rdsSecurityGroupId = database.connections.securityGroups[0].securityGroupId;

    new cdk.CfnOutput(this, 'DatabaseEndpoint', { value: database.dbInstanceEndpointAddress });

    const databaseUrl = `postgres://postgres:password123sjkdflkj!${database.dbInstanceEndpointAddress}:5432/pgdb`;
    const envFilePath = path.join(__dirname, '../../envs/compose/keystone.env');

    this.updateEnvFile(envFilePath, databaseUrl);
  }

  private async updateEnvFile(envFilePath: string, databaseUrl: string): Promise<void> {
    try {
      const envFileContent = await fs.readFile(envFilePath, 'utf8');
      const updatedContent = envFileContent.replace(/DATABASE_URL=.*/, `DATABASE_URL=${databaseUrl}`);
      await fs.writeFile(envFilePath, updatedContent, 'utf8');
      console.log('.env file updated with DATABASE_URL');
    } catch (error) {
      console.error('Error updating .env file:', error);
    }
  }
}
