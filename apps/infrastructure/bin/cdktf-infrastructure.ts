#!/usr/bin/env node
import "source-map-support/register";
import { App } from "cdktf";
import { AwsStaticDeploy } from "../lib/static-deploy/aws-static-deploy";
import { GcpStaticDeploy } from "../lib/static-deploy/gcp-static-deploy";
import { AzureStaticDeploy } from "../lib/static-deploy/azure-static-deploy";
import { AwsBackendStack } from "../lib/state-deploy/aws-backend-stack";
import { getConfig, getSourcePath } from "../lib/config";
import { GcpBackendStack } from "../lib/state-deploy/gcp-backend-stack";
import { AzureBackendStack } from "../lib/state-deploy/azure-backend-stack";

function main() {
  const app = new App();
  const config = getConfig();
  const sourcePath = getSourcePath();

  if (config.provider === "aws" && !config.region) {
    throw new Error("Region is required when deploying to AWS");
  }
  
  if (config.provider === "gcp" && (!config.gcpProject || !config.region || !config.gcpProjectNumber)) {
    throw new Error("GCP project, region, and project number are required when deploying to GCP");
  }
  
  if (config.provider === "azure" && !config.region) {
    throw new Error("Azure region is required when deploying to Azure");
  }

  if (config.backendType === "remote") {
    if (config.provider === "aws") {
      new AwsBackendStack(app, "remote-backend", config);
    }
    if (config.provider === "gcp") {
      new GcpBackendStack(app, "remote-backend", config);
    }
    if (config.provider === "azure") {
      new AzureBackendStack(app, "remote-backend", config);
    }
  }

  switch (config.provider) {
    case "aws":
      new AwsStaticDeploy(app, "static-hosting", {
        region: config.region!,
        siteName: config.siteName,
        sourcePath,
        backendType: config.backendType,
        awsBackend: config.awsBackend,
      });
      break;
      
    case "gcp":
      new GcpStaticDeploy(app, "static-hosting", {
        project: config.gcpProject!,
        region: config.region!,
        siteName: config.siteName,
        sourcePath,
        projectNumber: config.gcpProjectNumber!,
        backendType: config.backendType,
        gcpBackend: config.gcpBackend,
      });
      break;
      
    case "azure":
      const resourceGroupName = config.backendType === "remote" && config.azureBackend
        ? config.azureBackend.resourceGroupName
        : `${config.siteName}-rg`;
        
      new AzureStaticDeploy(app, "static-hosting", {
        location: config.region!,
        resourceGroupName: resourceGroupName,
        siteName: config.siteName,
        sourcePath,
        backendType: config.backendType,
        azureBackend: config.azureBackend,
      });
      break;
      
    default:
      throw new Error(`Unsupported cloud provider: ${config.provider}`);
  }

  app.synth();
}

main();
