import { Construct } from "constructs";
import { TerraformStack, TerraformOutput, ITerraformDependable, AzurermBackend } from "cdktf";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { uploadFilesToAzure } from "./static-upload";
import * as path from "path";
import * as glob from "glob";
import { getContentType } from "../keystone/utils";

interface AzureStaticDeployProps {
  location: string;
  resourceGroupName: string;
  siteName: string;
  sourcePath: string;
  backendType?: string;
  azureBackend?: {
    storageAccountName: string;
    containerName: string;
    key?: string;
  };
}

export class AzureStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: AzureStaticDeployProps) {
    super(scope, id);

    if (props.backendType === "remote") {
      if (!props.azureBackend) {
        throw new Error("azureBackend config is required when backendType is remote");
      }
      new AzurermBackend(this, {
        storageAccountName: props.azureBackend.storageAccountName,
        containerName: props.azureBackend.containerName,
        key: props.azureBackend.key || `${props.siteName}/terraform.tfstate`,
        resourceGroupName: props.resourceGroupName,
      });
    }

    new AzurermProvider(this, "azure", {
      features: {},
      skipProviderRegistration: true,
    });

    let resourceGroupName = props.resourceGroupName;
    if (props.backendType !== "remote") {
      const resourceGroup = new ResourceGroup(this, "resource-group", {
        name: props.resourceGroupName,
        location: props.location,
      });
      resourceGroupName = resourceGroup.name;
    }

    // Create Storage Account for static website
    const storageAccount = new StorageAccount(this, "storage-account", {
      name: props.siteName.replace(/-/g, "").toLowerCase(),
      resourceGroupName: resourceGroupName,
      location: props.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
      allowNestedItemsToBePublic: true,
      staticWebsite: {
        indexDocument: "index.html",
        error404Document: "404.html",
      },
      accessTier: "Hot",
    });

    // Create a dependency container with a unique name
    // The files will be uploaded to $web, but we need a dependency for Terraform to track
    const dependencyContainer = new StorageContainer(this, "dependency-container", {
      // Use a unique name with timestamp to avoid conflicts
      name: `dep${Math.floor(Date.now() / 1000)}`,
      storageAccountName: storageAccount.name,
      containerAccessType: "private",
    });

    // Use custom upload function to ensure files are updated on each deployment
    this.uploadFilesWithForcedUpdate(
      props.sourcePath, 
      storageAccount, 
      [dependencyContainer]
    );
    
    // Output the website URL
    new TerraformOutput(this, "storage_website_url", {
      value: storageAccount.primaryWebEndpoint,
      description: "URL of the Azure Storage static website",
    });
  }

  // Custom function that forces blob updates by using deployment timestamp in resource IDs
  private uploadFilesWithForcedUpdate(
    sourcePath: string,
    storageAccount: StorageAccount,
    dependencies: ITerraformDependable[]
  ): void {
    const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });
    
    // Generate a unique deployment ID
    const deploymentId = Date.now().toString();
    
    for (const file of files) {
      const relativePath = path.relative(sourcePath, file);
      const contentType = getContentType(file);
      const blobPath = relativePath.replace(/\\/g, "/");
      
      // Create a unique resource ID for each blob that changes with each deployment
      // This forces Terraform to recreate the blob on each deployment
      const resourceId = `azure-blob-${deploymentId}-${blobPath}`;
      
      new StorageBlob(this, resourceId, {
        name: blobPath,
        storageAccountName: storageAccount.name,
        storageContainerName: "$web",
        type: "Block",
        source: path.resolve(file),
        contentType,
        dependsOn: dependencies,
        // Fix metadata key to use all lowercase format per Azure requirements
        metadata: {
          deployment_id: deploymentId,
        },
      });
    }
  }
} 
