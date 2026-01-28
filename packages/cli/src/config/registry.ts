export interface RegistryConfig {
    importPath: string;
    className: string;
    filesToRemove: string[]; // Files to prune from the template
    type: 'cdktf' | 'config-only';
    filesToCreate?: Record<string, string>;
}

export const DEPLOYMENT_MATRIX: Record<string, Record<string, RegistryConfig>> = {
    // Strategy: STATIC
    static: {
        aws: {
            importPath: '@md/infrastructure/dist/aws/aws-static',
            className: 'AwsStaticSite',
            filesToRemove: ['Dockerfile', 'nginx.conf'],
            type: 'cdktf'
        },
        gcp: {
            importPath: '@md/infrastructure/dist/gcp/gcp-static',
            className: 'GcpStaticSite',
            filesToRemove: ['Dockerfile', 'nginx.conf'],
            type: 'cdktf'
        },
        azure: {
            importPath: '@md/infrastructure/dist/azure/azure-static',
            className: 'AzureStaticSite',
            filesToRemove: ['Dockerfile', 'nginx.conf'],
            type: 'cdktf'
        }
    },

    // Strategy: CONTAINER (Serverless / Managed)
    container: {
        aws: {
            importPath: '@md/infrastructure/dist/aws/aws-container',
            className: 'AwsFargateApp',
            filesToRemove: [], // Dockerfile needed
            type: 'cdktf'
        },
        gcp: {
            importPath: '@md/infrastructure/dist/gcp/gcp-container',
            className: 'GcpCloudRunApp',
            filesToRemove: [],
            type: 'cdktf'
        },
        azure: {
            importPath: '@md/infrastructure/dist/azure/azure-container',
            className: 'AzureContainerApp',
            filesToRemove: [],
            type: 'cdktf'
        }
    },

    // Strategy: VM (Virtual Machine / Bare Metal)
    vm: {
        aws: {
            importPath: '@md/infrastructure/dist/aws/aws-vm',
            className: 'AwsEc2App',
            filesToRemove: [],
            type: 'cdktf'
        },
        gcp: {
            importPath: '@md/infrastructure/dist/gcp/gcp-vm',
            className: 'GcpVmApp',
            filesToRemove: [],
            type: 'cdktf'
        },
        rpi: {
            importPath: '@md/infrastructure/dist/custom/rpi-docker',
            className: 'CustomDockerApp',
            filesToRemove: [],
            type: 'cdktf'
        }
    }
};
