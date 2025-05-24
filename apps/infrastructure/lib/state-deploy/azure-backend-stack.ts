import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { ResourceGroup } from "../../.gen/providers/azurerm/resource-group";
import { StorageAccount } from "../../.gen/providers/azurerm/storage-account";
import { StorageContainer } from "../../.gen/providers/azurerm/storage-container";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";
import { Config } from "../config";

export class AzureBackendStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: Config) {
    super(scope, id);

    if (!config.azureBackend) {
      throw new Error("Azure backend configuration is required");
    }

    new AzurermProvider(this, "azurerm", {
      features: {},
      skipProviderRegistration: true,
    });

    const resourceGroup = new ResourceGroup(this, "resource-group", {
      name: config.azureBackend.resourceGroupName,
      location: config.region!,
    });

    const storageAccount = new StorageAccount(this, "storage-account", {
      name: config.azureBackend.storageAccountName,
      resourceGroupName: resourceGroup.name,
      location: resourceGroup.location,
      accountTier: "Standard",
      accountReplicationType: "LRS",
    });

    new StorageContainer(this, "storage-container", {
      name: config.azureBackend.containerName,
      storageAccountName: storageAccount.name,
      containerAccessType: "private",
    });

    new TerraformOutput(this, "azure_backend_storage_account_name", {
      value: config.azureBackend.storageAccountName,
    });

    new TerraformOutput(this, "azure_backend_container_name", {
      value: config.azureBackend.containerName,
    });
  }
}
