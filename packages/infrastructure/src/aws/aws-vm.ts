import { Construct } from 'constructs';
import { Instance } from '@cdktf/provider-aws/lib/instance';
import { SecurityGroup } from '@cdktf/provider-aws/lib/security-group';
import { VirtualMachineProps } from '../interfaces';

export class AwsEc2App extends Construct {
    constructor(scope: Construct, id: string, props: VirtualMachineProps) {
        super(scope, id);

        // User Data to install Docker and run the container
        const userData = `#!/bin/bash
      yum update -y
      amazon-linux-extras install docker
      service docker start
      usermod -a -G docker ec2-user
      docker run -d -p 80:${props.port} ${Object.entries(props.envVars || {}).map(([k, v]) => `-e ${k}=${v}`).join(' ')} ${props.dockerImage}
    `;

        // Security Group allow HTTP/SSH
        const sg = new SecurityGroup(this, 'sg', {
            name: `${props.appName}-vm-sg`,
            ingress: [
                { fromPort: 80, toPort: 80, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] },
                { fromPort: 22, toPort: 22, protocol: 'tcp', cidrBlocks: ['0.0.0.0/0'] } // For debugging
            ],
            egress: [{ fromPort: 0, toPort: 0, protocol: '-1', cidrBlocks: ['0.0.0.0/0'] }]
        });

        new Instance(this, 'vm', {
            ami: 'ami-0c55b159cbfafe1f0', // Amazon Linux 2 (Example AMI, region dependent)
            instanceType: props.instanceType || 't3.micro',
            userData: userData, // CDKTF handles base64 encoding usually or provider dependent
            vpcSecurityGroupIds: [sg.id],
            tags: {
                Name: `${props.appName}-vm`
            }
        });
    }
}
