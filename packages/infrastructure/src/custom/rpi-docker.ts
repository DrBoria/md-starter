import { Construct } from 'constructs';
import { Container } from '@cdktf/provider-docker/lib/container';
import { Image } from '@cdktf/provider-docker/lib/image';
import { ContainerAppProps } from '../interfaces';

export class CustomDockerApp extends Construct {
    constructor(scope: Construct, id: string, props: ContainerAppProps) {
        super(scope, id);

        // Assumes Docker Provider is configured for the remote host (via SSH or socket) in main.ts stack

        // We optionally pull the image if it's external, or assume it exists.
        // Docker provider `Image` resource pulls it.

        const dockerImage = new Image(this, 'img', {
            name: props.dockerImage,
            keepLocally: true // Don't delete image on destroy? Or false? 
        });

        new Container(this, 'app', {
            name: props.appName,
            image: dockerImage.name,
            ports: [{ internal: props.port, external: props.port }],
            env: Object.entries(props.envVars || {}).map(([k, v]) => `${k}=${v}`)
        });
    }
}
