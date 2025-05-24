import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config();

export interface Config {
  provider: "aws" | "gcp" | "azure";
  backendType?: "local" | "remote";
  siteName: string;
  region?: string;
  gcpProject?: string;
  gcpProjectNumber?: string;
  awsBackend?: {
    bucket: string;
    key?: string;
    region: string;
    dynamodbTable: string;
    use_lockfile: boolean;
  };
  gcpBackend?: {
    bucket: string;
    prefix?: string;
  };
  azureBackend?: {
    storageAccountName: string;
    containerName: string;
    key?: string;
    resourceGroupName: string;
  };
}

export function generateResourceNames(siteName: string, provider: string, region?: string): any {
  switch (provider) {
    case "aws":
      return {
        bucket: `tfstate-${siteName}`,
        key: `${siteName}/terraform.tfstate`,
        region: region || "eu-central-1",
        dynamodbTable: `tflock-${siteName}`,
        use_lockfile: true
      };
    case "gcp":
      return {
        bucket: `tfstate-${siteName}`,
        prefix: `${siteName}/`
      };
    case "azure":
      const sanitizedName = siteName.replace(/-/g, "").toLowerCase();
      return {
        storageAccountName: `tfstate${sanitizedName}`,
        containerName: `tfstate`,
        key: `${siteName}/terraform.tfstate`,
        resourceGroupName: `${siteName}-rg`
      };
    default:
      return {};
  }
}

export function getConfig(): Config {
  const configPath = path.resolve(process.cwd(), "cloud-config.json");
  
  if (fs.existsSync(configPath)) {
    const configFile = JSON.parse(fs.readFileSync(configPath, "utf8"));
    
    if (configFile.backendType === "remote") {
      if (configFile.provider === "aws" && !configFile.awsBackend) {
        configFile.awsBackend = generateResourceNames(configFile.siteName, "aws", configFile.region);
      }
      if (configFile.provider === "gcp" && !configFile.gcpBackend) {
        configFile.gcpBackend = generateResourceNames(configFile.siteName, "gcp");
      }
      if (configFile.provider === "azure" && !configFile.azureBackend) {
        configFile.azureBackend = generateResourceNames(configFile.siteName, "azure");
      }
    }
    
    return configFile;
  }
  
  const provider = process.env.CLOUD_PROVIDER as "aws" | "gcp" | "azure" || "aws";
  const siteName = process.env.SITE_NAME || "my-site";
  const backendType = process.env.BACKEND_TYPE as "local" | "remote" || "local";
  
  const config: Config = {
    provider,
    backendType,
    siteName,
    region: process.env.REGION,
    gcpProject: process.env.GCP_PROJECT,
    gcpProjectNumber: process.env.GCP_PROJECT_NUMBER,
  };
  
  if (backendType === "remote") {
    if (provider === "aws") {
      config.awsBackend = generateResourceNames(siteName, "aws", process.env.REGION);
    }
    if (provider === "gcp") {
      config.gcpBackend = generateResourceNames(siteName, "gcp");
    }
    if (provider === "azure") {
      config.azureBackend = generateResourceNames(siteName, "azure");
    }
  }
  
  return config;
}

export function getSourcePath(): string {
  const defaultPath = path.resolve(__dirname, "../../landing/out");
  return process.env.SOURCE_PATH || defaultPath;
}
