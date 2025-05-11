import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { CdnProfile } from "@cdktf/provider-azurerm/lib/cdn-profile";
import { CdnEndpoint } from "@cdktf/provider-azurerm/lib/cdn-endpoint";
import { uploadFilesToAzure } from "./static-upload";
import * as path from "path";

export interface AzureStaticDeployProps {
  location: string;
  resourceGroupName: string;
  siteName: string;
  sourcePath: string;
}

export class AzureStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: AzureStaticDeployProps) {
    super(scope, id);

    new AzurermProvider(this, "azure", {
      features: {},
    });

    // Create Resource Group
    const resourceGroup = new ResourceGroup(this, "resource-group", {
      name: props.resourceGroupName,
      location: props.location,
    });

    // Create Storage Account for static website
    const storageAccount = new StorageAccount(this, "storage-account", {
      name: props.siteName.replace(/-/g, "").toLowerCase(),
      resourceGroupName: resourceGroup.name,
      location: resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
      allowNestedItemsToBePublic: true,
      staticWebsite: {
        indexDocument: "index.html",
        error404Document: "404.html",
      },
    });

    // Create Container for public access
    const container = new StorageContainer(this, "web-container", {
      name: "$web",
      storageAccountName: storageAccount.name,
      containerAccessType: "blob",
    });

    // Create CDN Profile for better performance
    const cdnProfile = new CdnProfile(this, "cdn-profile", {
      name: `${props.siteName}-cdn-profile`,
      location: resourceGroup.location,
      resourceGroupName: resourceGroup.name,
      sku: "Standard_Microsoft",
    });

    // Create CDN Endpoint
    const cdnEndpoint = new CdnEndpoint(this, "cdn-endpoint", {
      name: `${props.siteName}-cdn-endpoint`,
      profileName: cdnProfile.name,
      location: resourceGroup.location,
      resourceGroupName: resourceGroup.name,
      originHostHeader: storageAccount.primaryWebHost,
      origin: [{
        name: "storageOrigin",
        hostName: storageAccount.primaryWebHost,
      }],
    });

    // Upload static files to the storage account
    uploadFilesToAzure(this, storageAccount, props.sourcePath);
    
    // Output the website URLs
    new TerraformOutput(this, "storage_website_url", {
      value: storageAccount.primaryWebEndpoint,
      description: "URL of the Azure Storage static website",
    });
    
    new TerraformOutput(this, "cdn_endpoint_url", {
      value: `https://${cdnEndpoint.name}.azureedge.net`,
      description: "URL of the Azure CDN endpoint",
    });
  }
} 
