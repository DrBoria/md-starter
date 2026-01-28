import { Construct } from 'constructs';
import { ComputeInstance } from '@cdktf/provider-google/lib/compute-instance';
import { ComputeFirewall } from '@cdktf/provider-google/lib/compute-firewall';
import { VirtualMachineProps } from '../interfaces';

export class GcpVmApp extends Construct {
    constructor(scope: Construct, id: string, props: VirtualMachineProps) {
        super(scope, id);

        const startupScript = `#! /bin/bash
    sudo apt-get update
    sudo apt-get install -y docker.io
    sudo docker run -d -p 80:${props.port} ${Object.entries(props.envVars || {}).map(([k, v]) => `-e ${k}=${v}`).join(' ')} ${props.dockerImage}
    `;

        new ComputeFirewall(this, 'fw', {
            name: `${props.appName}-fw`,
            network: 'default',
            allow: [{ protocol: 'tcp', ports: ['80', '22'] }]
        });

        new ComputeInstance(this, 'vm', {
            name: props.appName,
            machineType: props.instanceType || 'e2-micro',
            zone: 'us-central1-a',
            bootDisk: {
                initializeParams: {
                    image: 'debian-cloud/debian-11'
                }
            },
            networkInterface: [{
                network: 'default',
                accessConfig: [{}] // Ephemeral IP
            }],
            metadataStartupScript: startupScript
        });
    }
}
