import { Construct } from 'constructs';
import { CloudRunService } from '@cdktf/provider-google/lib/cloud-run-service';
import { CloudRunServiceIamMember } from '@cdktf/provider-google/lib/cloud-run-service-iam-member';
import { ContainerAppProps } from '../interfaces';

export class GcpCloudRunApp extends Construct {
    constructor(scope: Construct, id: string, props: ContainerAppProps) {
        super(scope, id);

        const service = new CloudRunService(this, 'service', {
            name: props.appName,
            location: 'us-central1',
            template: {
                spec: {
                    containers: [{
                        image: props.dockerImage,
                        ports: [{ containerPort: props.port }],
                        env: Object.entries(props.envVars || {}).map(([name, value]) => ({ name, value }))
                    }]
                }
            }
        });

        // Make public
        new CloudRunServiceIamMember(this, 'public-access', {
            service: service.name,
            location: service.location,
            role: 'roles/run.invoker',
            member: 'allUsers'
        });
    }
}
