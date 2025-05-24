import { Construct } from "constructs";
// TerraformStack and fs are not used in this version of the file, can be removed if not used by other functions.
// import { TerraformStack } from "cdktf"; 
// import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as aws from '@cdktf/provider-aws'; // Main AWS provider namespace

// Specific imports for type hints if needed, though direct usage will be aws.s3Bucket.S3Bucket etc.
// import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket"; 
import { getContentType } from "../keystone/utils";

// GCP file upload
import { StorageBucketObject } from "@cdktf/provider-google/lib/storage-bucket-object";
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";

// Azure file upload
import { StorageBlob } from "@cdktf/provider-azurerm/lib/storage-blob";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { StorageContainer } from "@cdktf/provider-azurerm/lib/storage-container";

export function uploadFilesToAws(
  scope: Construct,
  bucketName: string,
  sourcePath: string
): void {
  const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });
  
  // Generate a unique deployment ID
  const deploymentId = Date.now().toString();

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);

    const s3ObjectKey = relativePath.replace(/\\/g, "/");
    // Include deploymentId in the resource ID to force updates
    const cdktfResourceId = `s3-object-${deploymentId}-${s3ObjectKey.replace(/[^a-zA-Z0-9]/g, "-")}`;

    new aws.s3Object.S3Object(scope, cdktfResourceId, {
      bucket: bucketName,
      key: s3ObjectKey,
      source: path.resolve(file),
      contentType,
      // Optionally add metadata to track deployments
      metadata: {
        deployment_id: deploymentId,
      },
    });
  }
}


export function uploadFilesToGcp(
  scope: Construct,
  bucket: StorageBucket,
  sourcePath: string
): void {
  const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });
  
  // Generate a unique deployment ID
  const deploymentId = Date.now().toString();

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);

    // Include deploymentId in the resource ID to force updates
    const cdktfResourceId = `gcp-object-${deploymentId}-${relativePath.replace(/[^a-zA-Z0-9]/g, "-")}`;

    new StorageBucketObject(scope, cdktfResourceId, {
      bucket: bucket.name,
      name: relativePath.replace(/\\/g, "/"),
      source: path.resolve(file),
      contentType,
      // Add metadata to track deployments
      metadata: {
        deployment_id: deploymentId,
      },
    });
  }
}

export function uploadFilesToAzure(
  scope: Construct,
  storageAccount: StorageAccount,
  sourcePath: string,
  webContainerResource: StorageContainer[]
): void {
  const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });
  
  // Generate a unique deployment ID
  const deploymentId = Date.now().toString();

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);
    const blobPath = relativePath.replace(/\\/g, "/");

    // Include deploymentId in the resource ID to force updates
    const cdktfResourceId = `azure-blob-${deploymentId}-${blobPath.replace(/[^a-zA-Z0-9]/g, "-")}`;

    new StorageBlob(scope, cdktfResourceId, {
      name: blobPath,
      storageAccountName: storageAccount.name,
      storageContainerName: "$web",
      type: "Block",
      source: path.resolve(file),
      contentType,
      dependsOn: webContainerResource,
      // Add metadata to track deployments
      metadata: {
        deployment_id: deploymentId,
      },
    });
  }
}
