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

    // Создание VPC для RDS
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


    // Создание экземпляра PostgreSQL
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
    
    const databaseEndpoint = database.dbInstanceEndpointAddress;
    const vpcId = this.vpc.vpcId;
    const rdsSecurityGroupId = this.rdsSecurityGroupId;

    // Создаем CfnOutput для извлечения значений после деплоя
    const databaseEndpointValue = new cdk.CfnOutput(this, 'DatabaseEndpoint', { value: databaseEndpoint });
    const VpcIdValue = new cdk.CfnOutput(this, 'VpcId', { value: vpcId });
    const RdsSecurityGroupIdValue = new cdk.CfnOutput(this, 'RdsSecurityGroupId', { value: rdsSecurityGroupId });

    // Записываем строку подключения и идентификаторы в файл .env
    const databaseUrl = `postgres://postgres:password123sjkdflkj!@${databaseEndpointValue}:5432/pgdb`;
    const envFilePath = path.join(__dirname, '../../envs/compose/keystone.env');
    this.updateEnvFile(envFilePath, { databaseUrl, vpcId, rdsSecurityGroupId });
  }

  private async updateEnvFile(envFilePath: string, envVars: { databaseUrl: string; vpcId: string; rdsSecurityGroupId: string }): Promise<void> {
    try {
      let envFileContent = await fs.readFile(envFilePath, 'utf8');

      // Обновляем или добавляем переменные окружения
      envFileContent = this.updateEnvVariable(envFileContent, 'DATABASE_URL', envVars.databaseUrl);
      envFileContent = this.updateEnvVariable(envFileContent, 'VPC_ID', envVars.vpcId);
      envFileContent = this.updateEnvVariable(envFileContent, 'RDS_SECURITY_GROUP_ID', envVars.rdsSecurityGroupId);

      await fs.writeFile(envFilePath, envFileContent, 'utf8');
      console.log('.env file updated with DATABASE_URL, VPC_ID, and RDS_SECURITY_GROUP_ID');
    } catch (error) {
      console.error('Error updating .env file:', error);
    }
  }

  private updateEnvVariable(content: string, key: string, value: string): string {
    const regex = new RegExp(`^${key}=.*`, 'm');
    if (regex.test(content)) {
      return content.replace(regex, `${key}=${value}`);
    } else {
      return `${content}\n${key}=${value}`;
    }
  }
}
