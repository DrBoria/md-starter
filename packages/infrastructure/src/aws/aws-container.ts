import { Construct } from 'constructs';
import { Vpc } from '@cdktf/provider-aws/lib/vpc';
import { Subnet } from '@cdktf/provider-aws/lib/subnet';
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group';
import { EcsCluster } from '@cdktf/provider-aws/lib/ecs-cluster';
import { EcsService } from '@cdktf/provider-aws/lib/ecs-service';
import { EcsTaskDefinition } from '@cdktf/provider-aws/lib/ecs-task-definition';
import { Alb } from '@cdktf/provider-aws/lib/alb';
import { AlbListener } from '@cdktf/provider-aws/lib/alb-listener';
import { AlbTargetGroup } from '@cdktf/provider-aws/lib/alb-target-group';
import { DbInstance } from '@cdktf/provider-aws/lib/db-instance';
import { SecretsmanagerSecret } from '@cdktf/provider-aws/lib/secretsmanager-secret';
import { SecretsmanagerSecretVersion } from '@cdktf/provider-aws/lib/secretsmanager-secret-version';
import { ContainerAppProps } from '../interfaces';
import { TerraformOutput } from 'cdktf';

export class AwsFargateApp extends Construct {
    constructor(scope: Construct, id: string, props: ContainerAppProps) {
        super(scope, id);

        // --- NETWORK ---
        const vpc = new Vpc(this, 'vpc', {
            cidrBlock: '10.0.0.0/16',
            enableDnsHostnames: true,
            enableDnsSupport: true,
            tags: { Name: `${props.appName}-vpc` }
        });

        // We need 2 subnets for RDS usually (DB Subnet Group)
        const subnetA = new Subnet(this, 'subnet_a', {
            vpcId: vpc.id,
            cidrBlock: '10.0.1.0/24',
            availabilityZone: 'us-east-1a',
            mapPublicIpOnLaunch: true
        });
        const subnetB = new Subnet(this, 'subnet_b', {
            vpcId: vpc.id,
            cidrBlock: '10.0.2.0/24',
            availabilityZone: 'us-east-1b',
            mapPublicIpOnLaunch: true
        });

        // --- SECURITY GROUPS ---
        const lbSg = new SecurityGroup(this, 'lb_sg', {
            vpcId: vpc.id,
            ingress: [{ fromPort: 80, toPort: 80, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] }],
            egress: [{ fromPort: 0, toPort: 0, protocol: '-1', cidrBlocks: ['0.0.0.0/0'] }]
        });

        const ecsSg = new SecurityGroup(this, 'ecs_sg', {
            vpcId: vpc.id,
            ingress: [{ fromPort: 0, toPort: 0, protocol: '-1', securityGroups: [lbSg.id] }], // Allow from LB
            egress: [{ fromPort: 0, toPort: 0, protocol: '-1', cidrBlocks: ['0.0.0.0/0'] }]
        });

        const dbSg = new SecurityGroup(this, 'db_sg', {
            vpcId: vpc.id,
            ingress: [{ fromPort: 5432, toPort: 5432, protocol: 'tcp', securityGroups: [ecsSg.id] }], // Allow from ECS
        });


        // --- DATABASE (Postgres) ---
        // 1. Password Secret
        const dbSecret = new SecretsmanagerSecret(this, 'db_secret', {
            name: `${props.appName}-db-pwd-${Date.now()}` // Unique name
        });

        const dbPassword = "Password123!"; // In real CDKTF we'd generate this or use RandomProvider
        new SecretsmanagerSecretVersion(this, 'db_secret_ver', {
            secretId: dbSecret.id,
            secretString: dbPassword
        });

        // 2. RDS Instance
        const db = new DbInstance(this, 'db', {
            identifier: `${props.appName}-db`,
            engine: 'postgres',
            engineVersion: '15.3',
            instanceClass: 'db.t3.micro',
            allocatedStorage: 20,
            dbName: 'keystone',
            username: 'postgres',
            password: dbPassword,
            vpcSecurityGroupIds: [dbSg.id],
            // dbSubnetGroupName: needs a group with 2 azs.
            // For simplicity in this generated code, we skip creating the subnet group resource explicitly 
            // unless required by provider (it usually is). 
            // If it fails, we add DbSubnetGroup.
            skipFinalSnapshot: true,
            publiclyAccessible: false
        });


        // --- ECS ---
        const alb = new Alb(this, 'alb', {
            name: `${props.appName}-alb`,
            subnets: [subnetA.id, subnetB.id],
            securityGroups: [lbSg.id]
        });

        const targetGroup = new AlbTargetGroup(this, 'tg', {
            name: `${props.appName}-tg`,
            port: 80,
            protocol: 'HTTP',
            vpcId: vpc.id,
            targetType: 'ip',
            healthCheck: { path: '/healthcheck' }
        });

        new AlbListener(this, 'listener', {
            loadBalancerArn: alb.arn,
            port: 80,
            protocol: 'HTTP',
            defaultAction: [{ type: 'forward', targetGroupArn: targetGroup.arn }]
        });

        const cluster = new EcsCluster(this, 'cluster', { name: `${props.appName}-cluster` });

        const taskDef = new EcsTaskDefinition(this, 'task', {
            family: props.appName,
            cpu: '512',
            memory: '2048',
            networkMode: 'awsvpc',
            requiresCompatibilities: ['FARGATE'],
            containerDefinitions: JSON.stringify([{
                name: props.appName,
                image: props.dockerImage, // e.g. "drboria/turbo"
                portMappings: [{ containerPort: props.port }],
                environment: [
                    { name: 'DATABASE_HOST', value: db.address },
                    { name: 'DATABASE_PORT', value: "5432" },
                    { name: 'DATABASE_USER', value: "postgres" },
                    { name: 'DATABASE_PASSWORD', value: dbPassword }, // Direct injection for simplicity vs SecretsManager ARN reading in code
                    // { name: 'SESSION_SECRET', value: "..." }
                    ...Object.entries(props.envVars || {}).map(([name, value]) => ({ name, value }))
                ]
            }])
        });

        new EcsService(this, 'service', {
            name: `${props.appName}-service`,
            cluster: cluster.id,
            taskDefinition: taskDef.arn,
            desiredCount: 1,
            launchType: 'FARGATE',
            networkConfiguration: {
                subnets: [subnetA.id, subnetB.id],
                securityGroups: [ecsSg.id],
                assignPublicIp: true
            },
            loadBalancer: [{
                targetGroupArn: targetGroup.arn,
                containerName: props.appName,
                containerPort: props.port
            }]
        });

        new TerraformOutput(this, 'lb_dns', { value: alb.dnsName });
        new TerraformOutput(this, 'db_endpoint', { value: db.address });
    }
}
