import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as elbv2 from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import * as autoscaling from 'aws-cdk-lib/aws-autoscaling';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface EcsStackProps extends cdk.StackProps {
  vpc: ec2.IVpc;
  ec2SecurityGroup: ec2.ISecurityGroup;
  rdsOutputs: any;
}

export class EcsStack extends Stack {
  constructor(scope: Construct, id: string, props: EcsStackProps) {
    super(scope, id, props);

    const { vpc, ec2SecurityGroup, rdsOutputs } = props;

    // Создаем ECS Cluster
    const cluster = new ecs.Cluster(this, 'TurboCluster', { vpc });

    // Создаем роль для EC2 Instances
    const instanceRole = new iam.Role(this, 'EcsInstanceRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonEC2ContainerServiceforEC2Role'),
      ],
    });
    const existingKeyPair = ec2.KeyPair.fromKeyPairName(this, 'ExistingKeyPair', 'pem-pem');

    // Создаем Auto Scaling Group для EC2 Instances
    const autoScalingGroup = new autoscaling.AutoScalingGroup(this, 'TurboAutoScalingGroup', {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: new ec2.InstanceType('t2.micro'),
      machineImage: ecs.EcsOptimizedImage.amazonLinux2(),
      minCapacity: 1,
      maxCapacity: 1,
      securityGroup: ec2SecurityGroup,
      role: instanceRole,
      keyPair: existingKeyPair
    });

    // Привязываем Auto Scaling Group к кластеру ECS
    cluster.addAsgCapacityProvider(
      new ecs.AsgCapacityProvider(this, 'TurboAsgProvider', {
        autoScalingGroup,
        capacityProviderName: "TurboAsgCapacityProvider"
      })
    );

    // Создаем ECS task definition для EC2
    const taskDefinition = new ecs.Ec2TaskDefinition(this, 'TurboTaskDef', {
      networkMode: ecs.NetworkMode.AWS_VPC,
    });

    const { rdsPasswordSecretArn, rdsPort, rdsUsername, rdsEndpoint, rdsDbName } = rdsOutputs;

    instanceRole.addToPolicy(new iam.PolicyStatement({
      actions: ['secretsmanager:GetSecretValue'],
      resources: [rdsPasswordSecretArn], // ARN секрета, на который должен быть доступ
    }));

    const dbSecret = secretsmanager.Secret.fromSecretCompleteArn(
      this,
      'pgdbmd-credentials',
      rdsPasswordSecretArn
    );

    // Add the container to the task definition
    taskDefinition.addContainer('TurboContainer', {
      image: ecs.ContainerImage.fromRegistry('drboria/turbo:latest'),
      environment: {
        DB_USER: rdsUsername,
        DB_PORT: rdsPort,
        DB_ENDPOINT: rdsEndpoint,
        DB_NAME: rdsDbName,
      },
      secrets: {
        DB_PASSWORD: ecs.Secret.fromSecretsManager(dbSecret, 'password'),
      },
      logging: ecs.LogDriver.awsLogs({ streamPrefix: 'TurboContainer' }),
      memoryReservationMiB: 512,
      portMappings: [
        {
          containerPort: 80, // The container's internal port
          protocol: ecs.Protocol.TCP,
        },
        {
          containerPort: 443, // The container's internal port
          protocol: ecs.Protocol.TCP,
        },
      ],
    });

    // Создаем ECS Service для EC2
    const service = new ecs.Ec2Service(this, 'TurboEc2Service', {
      cluster,
      taskDefinition,
      desiredCount: 1,
      securityGroups: [ec2SecurityGroup],
    });

    // const nlb = new elbv2.NetworkLoadBalancer(this, 'MyNLB', {
    //   vpc, // VPC для NLB
    //   internetFacing: true, // Делаем NLB доступным из интернета
    // });

    // // Добавляем Listener
    // const listener = nlb.addListener('TCPListener443', {
    //   port: 443, // Открываем TCP порт 443
    // });

    // // Добавляем целевой ресурс
    // listener.addTargets('TurboTargetGroup443', {
    //   port: 443, // Контейнерный порт
    //   targets: [service],
    //   healthCheck: {
    //     path: '/health', // The health check endpoint defined in your Keystone app
    //     interval: cdk.Duration.seconds(30), // How often to run the health check
    //     timeout: cdk.Duration.seconds(5), // How long to wait for a response
    //     healthyThresholdCount: 2, // Number of consecutive successes required to mark the target healthy
    //     unhealthyThresholdCount: 2, // Number of consecutive failures required to mark the target unhealthy
    //     protocol: elbv2.Protocol.HTTP, // Protocol used for the health check
    //     port: '443', // Internal port used for the health check
    //   },
    // });

    // // Добавляем Listener
    // const listenerHttp = nlb.addListener('TCPListener80', {
    //   port: 80, // Открываем TCP порт 443
    // });

    // // Добавляем целевой ресурс
    // listenerHttp.addTargets('TurboTargetGroup80', {
    //   port: 80, // Контейнерный порт
    //   targets: [service],
    //   healthCheck: {
    //     path: '/health', // The health check endpoint defined in your Keystone app
    //     interval: cdk.Duration.seconds(30), // How often to run the health check
    //     timeout: cdk.Duration.seconds(5), // How long to wait for a response
    //     healthyThresholdCount: 2, // Number of consecutive successes required to mark the target healthy
    //     unhealthyThresholdCount: 2, // Number of consecutive failures required to mark the target unhealthy
    //     protocol: elbv2.Protocol.HTTP, // Protocol used for the health check
    //     port: '80', // Internal port used for the health check
    //   },
    // });


    // new cdk.CfnOutput(this, 'LoadBalancerDNS', {
    //   value: nlb.loadBalancerDnsName,
    // });
  }
}
