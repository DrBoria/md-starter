export type DeploymentType = 'cdktf' | 'config-only';

export interface DeployConfig {
    type: DeploymentType;
    label: string;
    // CDKTF Specifics
    importPath?: string;
    className?: string; // Class name to import/instantiate
    // File Management
    filesToRemove: string[]; // Relative to project root
    filesToCreate?: Record<string, string>; // filename -> content
}

export const DEPLOYMENT_REGISTRY: Record<string, Record<string, DeployConfig>> = {

    // Strategy: STATIC (S3, GCS, Vercel)
    // Strategy: STATIC (S3, GCS, Vercel)
    static: {
        aws: {
            label: 'AWS S3 + CloudFront',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/aws/aws-static',
            className: 'AwsStaticSite',
            filesToRemove: ['Dockerfile', 'nginx.conf']
        },
        gcp: {
            label: 'GCP Cloud Storage',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/gcp/gcp-static',
            className: 'GcpStaticSite',
            filesToRemove: ['Dockerfile', 'nginx.conf']
        },
        vercel: {
            label: 'Vercel',
            type: 'config-only',
            filesToRemove: ['Dockerfile', 'nginx.conf', 'infrastructure'],
            filesToCreate: {
                'vercel.json': JSON.stringify({ framework: "vite", cleanUrls: true }, null, 2)
            }
        }
    },

    // Strategy: CONTAINER (Docker + Cloud)
    container: {
        aws: {
            label: 'AWS Fargate',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/aws/aws-container',
            className: 'AwsContainerApp',
            filesToRemove: []
        },
        gcp: {
            label: 'GCP Cloud Run',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/gcp/gcp-container',
            className: 'GcpCloudRunApp',
            filesToRemove: []
        },
        rpi: {
            label: 'Raspberry Pi (Home Lab)',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/custom/rpi-docker',
            className: 'CustomDockerApp',
            filesToRemove: []
        }
    },

    // Strategy: VM (Virtual Machine / Bare Metal)
    vm: {
        aws: {
            label: 'AWS EC2',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/aws/aws-vm',
            className: 'AwsEc2App',
            filesToRemove: []
        },
        gcp: {
            label: 'GCP Compute Engine',
            type: 'cdktf',
            importPath: '@md/infrastructure/dist/gcp/gcp-vm',
            className: 'GcpVmApp',
            filesToRemove: []
        }
    }
};
