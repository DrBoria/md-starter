import { Construct } from 'constructs';
import { ResourceGroup } from '@cdktf/provider-azurerm/lib/resource-group';
import { ContainerApp } from '@cdktf/provider-azurerm/lib/container-app';
import { ContainerAppEnvironment } from '@cdktf/provider-azurerm/lib/container-app-environment';
import { ContainerAppEnvironmentDaprComponent } from '@cdktf/provider-azurerm/lib/container-app-environment-dapr-component';
// Note: We need Log Analytics Workspace usually for Environment
import { LogAnalyticsWorkspace } from '@cdktf/provider-azurerm/lib/log-analytics-workspace';

import { ContainerAppProps } from '../interfaces';
import { TerraformOutput } from 'cdktf';

export class AzureContainerApp extends Construct {
    constructor(scope: Construct, id: string, props: ContainerAppProps) {
        super(scope, id);

        const rg = new ResourceGroup(this, 'rg', {
            name: `${props.appName}-rg`,
            location: 'East US',
        });

        const logAnalytics = new LogAnalyticsWorkspace(this, 'logs', {
            name: `${props.appName}-logs`,
            location: rg.location,
            resourceGroupName: rg.name,
            sku: 'PerGB2018',
            retentionInDays: 30
        });

        const env = new ContainerAppEnvironment(this, 'env', {
            name: `${props.appName}-env`,
            location: rg.location,
            resourceGroupName: rg.name,
            logAnalyticsWorkspaceId: logAnalytics.id
        });

        const app = new ContainerApp(this, 'app', {
            name: props.appName,
            containerAppEnvironmentId: env.id,
            resourceGroupName: rg.name,
            revisionMode: 'Single',
            template: {
                container: [{
                    name: props.appName,
                    image: props.dockerImage,
                    cpu: 0.25,
                    memory: "0.5Gi", // String format required
                    env: Object.entries(props.envVars || {}).map(([name, value]) => ({ name, value }))
                }]
            },
            ingress: {
                targetPort: props.port,
                externalEnabled: true,
                trafficWeight: [{
                    percentage: 100,
                    latestRevision: true
                }]
            }
        });

        new TerraformOutput(this, 'app_url', { value: `https://${app.ingress.fqdn}` });
    }
}
