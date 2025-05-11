#!/usr/bin/env node
import { App } from "cdktf";
import { AwsStaticDeploy } from "../lib/static-deploy/aws-static-deploy";
import { GcpStaticDeploy } from "../lib/static-deploy/gcp-static-deploy";
import { AzureStaticDeploy } from "../lib/static-deploy/azure-static-deploy";
import { getConfig, getSourcePath } from "../lib/static-deploy/config";

const app = new App();
const config = getConfig();
const sourcePath = getSourcePath();

// Deploy to the selected cloud provider based on configuration
switch (config.provider) {
  case "aws":
    if (!config.awsRegion) {
      throw new Error("AWS region is required when deploying to AWS");
    }
    
    new AwsStaticDeploy(app, "aws-static-deploy", {
      region: config.awsRegion,
      siteName: config.siteName,
      sourcePath,
    });
    break;
    
  case "gcp":
    if (!config.gcpProject || !config.gcpRegion) {
      throw new Error("GCP project and region are required when deploying to GCP");
    }
    
    new GcpStaticDeploy(app, "gcp-static-deploy", {
      project: config.gcpProject,
      region: config.gcpRegion,
      siteName: config.siteName,
      sourcePath,
    });
    break;
    
  case "azure":
    if (!config.azureLocation || !config.azureResourceGroup) {
      throw new Error("Azure location and resource group are required when deploying to Azure");
    }
    
    new AzureStaticDeploy(app, "azure-static-deploy", {
      location: config.azureLocation,
      resourceGroupName: config.azureResourceGroup,
      siteName: config.siteName,
      sourcePath,
    });
    break;
    
  default:
    throw new Error(`Unsupported cloud provider: ${config.provider}`);
}

app.synth(); 
