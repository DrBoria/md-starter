import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";
import { StorageBucketIamBinding } from "@cdktf/provider-google/lib/storage-bucket-iam-binding";
import { uploadFilesToGcp } from "./static-upload";

export interface GcpStaticDeployProps {
  project: string;
  region: string;
  siteName: string;
  sourcePath: string;
}

export class GcpStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: GcpStaticDeployProps) {
    super(scope, id);

    new GoogleProvider(this, "google", {
      project: props.project,
      region: props.region,
      credentials: process.env.GOOGLE_CREDENTIALS || undefined
    });

    // Create Google Cloud Storage bucket for static website
    const websiteBucket = new StorageBucket(this, "static-site-bucket", {
      name: props.siteName,
      location: props.region.toUpperCase(),
      forceDestroy: true,
      website: {
        mainPageSuffix: "index.html",
        notFoundPage: "404.html",
      },
      uniformBucketLevelAccess: true,
    });

    // Make the bucket publicly readable
    new StorageBucketIamBinding(this, "bucket-public-access", {
      bucket: websiteBucket.name,
      role: "roles/storage.objectViewer",
      members: ["allUsers"],
    });

    // Upload static files to the bucket
    uploadFilesToGcp(this, websiteBucket, props.sourcePath);
    
    // Output the website URL
    new TerraformOutput(this, "website_url", {
      value: `https://storage.googleapis.com/${websiteBucket.name}/index.html`,
      description: "URL of the GCS static website",
    });
  }
} 
