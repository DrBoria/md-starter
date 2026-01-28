import { Construct } from 'constructs';
import { ResourceGroup } from '@cdktf/provider-azurerm/lib/resource-group';
import { StorageAccount } from '@cdktf/provider-azurerm/lib/storage-account';
import { TerraformOutput } from 'cdktf';
import { StaticSiteProps } from '../interfaces';

export class AzureStaticSite extends Construct {
    constructor(scope: Construct, id: string, props: StaticSiteProps) {
        super(scope, id);

        const rg = new ResourceGroup(this, 'rg', {
            name: `${props.appName}-rg`,
            location: 'East US', // Should be configurable
        });

        const storage = new StorageAccount(this, 's3', {
            name: props.appName.replace(/[^a-z0-9]/g, '').toLowerCase().substring(0, 24), // specific naming rules
            resourceGroupName: rg.name,
            location: rg.location,
            accountTier: 'Standard',
            accountReplicationType: 'LRS',
            staticWebsite: {
                indexDocument: 'index.html',
                error404Document: '404.html'
            },
            // enableHttpsTrafficOnly: true // default
        });

        // Note: To upload files effectively in CDKTF TS without module support requires iterating blobs.
        // For now, we prepare the infrastructure. uploadFilesToAzure logic exists in legacy but we won't inline it fully here unless needed.

        new TerraformOutput(this, 'website_url', {
            value: storage.primaryWebEndpoint
        });
    }
}
