import { Construct } from "constructs";
// TerraformStack and fs are not used in this version of the file, can be removed if not used by other functions.
// import { TerraformStack } from "cdktf"; 
// import * as fs from "fs";
import * as path from "path";
import * as glob from "glob";
import * as aws from '@cdktf/provider-aws'; // Main AWS provider namespace

// Specific imports for type hints if needed, though direct usage will be aws.s3Bucket.S3Bucket etc.
// import { S3Bucket } from "@cdktf/provider-aws/lib/s3-bucket"; 
import { getContentType } from "../utils";

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

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);

    const s3ObjectKey = relativePath.replace(/\\/g, "/");
    const cdktfResourceId = `s3-object-${s3ObjectKey}`;

    new aws.s3BucketObject.S3BucketObject(scope, cdktfResourceId, {
      bucket: bucketName,
      key: s3ObjectKey,
      source: path.resolve(file),
      contentType,
    });
  }
}


export function uploadFilesToGcp(
  scope: Construct,
  bucket: StorageBucket,
  sourcePath: string
): void {
  const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);

    new StorageBucketObject(scope, `gcp-object-${relativePath}`, {
      bucket: bucket.name,
      name: relativePath,
      source: file,
      contentType,
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

  for (const file of files) {
    const relativePath = path.relative(sourcePath, file);
    const contentType = getContentType(file);

    new StorageBlob(scope, `azure-blob-${relativePath.replace(/\\/g, "/")}` , {
      name: relativePath.replace(/\\/g, "/"),
      storageAccountName: storageAccount.name,
      storageContainerName: "$web",
      type: "Block",
      source: path.resolve(file),
      contentType,
      dependsOn: webContainerResource,
    });
  }
} 
