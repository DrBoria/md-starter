import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';

export class RdsStack extends cdk.Stack {
  public readonly vpc: ec2.Vpc;
  public readonly ec2SecurityGroup: ec2.SecurityGroup;
  public readonly rdsEndpoint: string;
  public readonly outputs: any;
  public readonly rdsPort: string;
  public readonly rdsDbName: string;
  public readonly rdsUsername: string;
  public readonly rdsPasswordSecretArn: string;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Создаем VPC
    this.vpc = new ec2.Vpc(this, 'RdsVpc', {
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: 'public',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    // Создаем Security Group для EC2-инстанса
    this.ec2SecurityGroup = new ec2.SecurityGroup(this, 'Ec2SecurityGroup', {
      vpc: this.vpc,
      description: 'Allow access for EC2 instances',
      allowAllOutbound: true,
    });

    this.ec2SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allow SSH access from anywhere'
    );

    this.ec2SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allow HTTP traffic from anywhere'
    );

    this.ec2SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.allTcp(),
      'Allow HTTP traffic from anywhere'
    );

    this.ec2SecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allow HTTPS traffic from anywhere'
    );

    this.ec2SecurityGroup.addEgressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.allTraffic(),
      'Allow all outbound traffic'
    );

    this.ec2SecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(3000), 'Allow HTTP traffic on port 3000');

    // Создаем секрет для пароля базы данных
    const dbSecret = new secretsmanager.Secret(this, 'DatabaseSecret', {
      secretName: 'pgdbmd-credentials',
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: 'bobauser',
        }),
        generateStringKey: 'password',
        excludePunctuation: true,
      },
    });

    // Создаем Security Group для RDS
    const dbSecurityGroup = new ec2.SecurityGroup(this, 'RdsSecurityGroup', {
      vpc: this.vpc,
      description: 'Allow database access',
      allowAllOutbound: true,
    });

    dbSecurityGroup.addIngressRule(
      ec2.Peer.securityGroupId(this.ec2SecurityGroup.securityGroupId), // Разрешаем доступ с других экземпляров в той же VPC
      ec2.Port.tcp(5432),
      'Allow access from EC2 instances within the VPC'
    );

    // dbSecurityGroup.addIngressRule(
    //   ec2.Peer.ipv4('0.0.0.0/0'),
    //   ec2.Port.tcp(5432),
    //   'Allow access from anywhere' // Включите это только в случае необходимости!
    // );

    // Создаем PostgreSQL RDS
    const dbInstance = new rds.DatabaseInstance(this, 'PostgresRDS', {
      engine: rds.DatabaseInstanceEngine.postgres({ version: rds.PostgresEngineVersion.VER_15 }),
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3, ec2.InstanceSize.MICRO),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      multiAz: false,
      allocatedStorage: 20,
      maxAllocatedStorage: 25,
      publiclyAccessible: true,
      databaseName: 'pgdbmd',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      deletionProtection: false,
      credentials: rds.Credentials.fromSecret(dbSecret),
      securityGroups: [dbSecurityGroup]
    });

    // Экспорт параметров RDS
    this.outputs = {
      rdsEndpoint: dbInstance.dbInstanceEndpointAddress,
      rdsPort: dbInstance.dbInstanceEndpointPort,
      rdsDbName: 'pgdbmd',
      rdsUsername: 'bobauser',
      rdsPasswordSecretArn: dbSecret.secretArn,
    };

    new cdk.CfnOutput(this, 'RdsEndpoint', { value: this.outputs.rdsEndpoint });
    new cdk.CfnOutput(this, 'RdsPort', { value: this.outputs.rdsPort });
    new cdk.CfnOutput(this, 'RdsDbName', { value: this.outputs.rdsDbName });
    new cdk.CfnOutput(this, 'RdsUsername', { value: this.outputs.rdsUsername });
    new cdk.CfnOutput(this, 'RdsPasswordSecretArn', { value: this.outputs.rdsPasswordSecretArn });
  }
}
