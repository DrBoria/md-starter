import * as cdk from 'aws-cdk-lib';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecsPatterns from 'aws-cdk-lib/aws-ecs-patterns';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

export class EcsRdsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Создаём VPC
    const vpc = new ec2.Vpc(this, 'MyTypescriptVpc', {
      maxAzs: 2, // Максимум зон доступности
    });

    // Создаём кластер ECS
    const cluster = new ecs.Cluster(this, 'MyTypescriptEcsCluster', {
      vpc,
    });

    // Создаём секрет для базы данных
    const dbSecret = new secretsmanager.Secret(this, 'DbSecret', {
      secretName: 'PostgresCredentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'postgres' }),
        generateStringKey: 'password',
        excludeCharacters: '"@/',
        passwordLength: 12,
      },
    });

    // Создаём RDS PostgreSQL
    const database = new rds.DatabaseInstance(this, 'MyTypescriptPostgresInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
      vpc,
      vpcSubnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MICRO),
      credentials: rds.Credentials.fromSecret(dbSecret),
      databaseName: 'pgdb',
      multiAz: false,
      allocatedStorage: 20, // В гигабайтах
      maxAllocatedStorage: 25,
      publiclyAccessible: false,
      removalPolicy: cdk.RemovalPolicy.DESTROY, // Не для production!
      deletionProtection: false,
    });

    // Создаём Fargate сервис и подключаем его к кластеру
    // In the task definition, reference the secret instead of passing the value directly
    const fargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'MyTypescriptFargateService', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('drboria/turbo'),
        environment: {
          DATABASE_HOST: database.dbInstanceEndpointAddress,
          DATABASE_PORT: database.dbInstanceEndpointPort,
          DATABASE_USER: 'postgres',
        },
        secrets: {
          DATABASE_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, 'password'), // Pass the secret here
        },
      },
      desiredCount: 1,
      cpu: 512, // 0.5 vCPU
      memoryLimitMiB: 2048, // 2 GB RAM
      publicLoadBalancer: true, // Public access
    });


    // Разрешаем ECS сервису подключаться к базе данных
    database.connections.allowFrom(fargateService.service, ec2.Port.tcp(5432));

    // Выводим параметры в консоль
    new cdk.CfnOutput(this, 'LoadBalancerDNS', {
      value: fargateService.loadBalancer.loadBalancerDnsName,
    });

    new cdk.CfnOutput(this, 'DatabaseEndpoint', {
      value: database.dbInstanceEndpointAddress,
    });

    new cdk.CfnOutput(this, 'DatabaseSecretName', {
      value: dbSecret.secretName,
    });
  }
}
