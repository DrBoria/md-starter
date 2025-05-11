import * as dotenv from "dotenv";
import * as path from "path";
import * as fs from "fs";

dotenv.config();

export interface CloudConfig {
  provider: "aws" | "gcp" | "azure";
  siteName: string;
  
  // AWS specific
  awsRegion?: string;
  
  // GCP specific
  gcpProject?: string;
  gcpRegion?: string;
  
  // Azure specific
  azureLocation?: string;
  azureResourceGroup?: string;
}

export function getConfig(): CloudConfig {
  const configPath = path.resolve(process.cwd(), "cloud-config.json");
  
  if (fs.existsSync(configPath)) {
    const configFile = JSON.parse(fs.readFileSync(configPath, "utf8"));
    return configFile;
  }
  
  // Fallback to environment variables or default values
  return {
    provider: process.env.CLOUD_PROVIDER as "aws" | "gcp" | "azure" || "aws",
    siteName: process.env.SITE_NAME || "md-static-site",
    
    // AWS specific
    awsRegion: process.env.AWS_REGION || "us-east-1",
    
    // GCP specific
    gcpProject: process.env.GCP_PROJECT || "",
    gcpRegion: process.env.GCP_REGION || "us-central1",
    
    // Azure specific
    azureLocation: process.env.AZURE_LOCATION || "East US",
    azureResourceGroup: process.env.AZURE_RESOURCE_GROUP || "md-static-site-rg",
  };
}

// Path to the Next.js export directory
export function getSourcePath(): string {
  const defaultPath = path.resolve(__dirname, "../../../landing/out");
  return process.env.SOURCE_PATH || defaultPath;
} 
