import { Construct } from "constructs";
import { TerraformStack, TerraformOutput, GcsBackend } from "cdktf";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";
import { StorageBucketIamMember } from "@cdktf/provider-google/lib/storage-bucket-iam-member";
import { ComputeBackendBucket } from "@cdktf/provider-google/lib/compute-backend-bucket";
import { ComputeGlobalAddress } from "@cdktf/provider-google/lib/compute-global-address";
import { ComputeGlobalForwardingRule } from "@cdktf/provider-google/lib/compute-global-forwarding-rule";
import { ComputeTargetHttpProxy } from "@cdktf/provider-google/lib/compute-target-http-proxy";
import { ComputeUrlMap } from "@cdktf/provider-google/lib/compute-url-map";
import { uploadFilesToGcp } from "./static-upload";
import { DataGoogleStorageProjectServiceAccount } from "@cdktf/provider-google/lib/data-google-storage-project-service-account";
import { StorageBucketIamBinding } from "@cdktf/provider-google/lib/storage-bucket-iam-binding";

interface GcpStaticDeployProps {
  project: string;
  region: string;
  siteName: string;
  sourcePath: string;
  projectNumber: string;
  backendType?: string;
  gcpBackend?: {
    bucket: string;
    prefix?: string;
  };
}

export class GcpStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: GcpStaticDeployProps) {
    super(scope, id);

    if (props.backendType === "remote") {
      if (!props.gcpBackend) {
        throw new Error("gcpBackend config is required when backendType is remote");
      }
      new GcsBackend(this, {
        bucket: props.gcpBackend.bucket,
        prefix: props.gcpBackend.prefix || `${props.siteName}/`,
      });
    }

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

    // --- Load Balancer Configuration ---

    // 1. Static IP Address for Load Balancer
    const ipAddress = new ComputeGlobalAddress(this, "lb-static-ip", {
      name: `${props.siteName}-lb-ip`,
      project: props.project,
    });

    // 2. Backend Bucket (points LB to GCS bucket)
    const backendBucket = new ComputeBackendBucket(this, "gcs-backend-bucket", {
      name: `${props.siteName}-backend-bucket`,
      bucketName: websiteBucket.name,
      enableCdn: true, // Enable Cloud CDN as suggested
      project: props.project,
      dependsOn: [websiteBucket], // Ensure bucket exists before creating backend
    });

    // 3. URL Map (directs all traffic to the backend bucket)
    const urlMap = new ComputeUrlMap(this, "lb-url-map", {
      name: `${props.siteName}-url-map`,
      defaultService: backendBucket.id,
      project: props.project,
    });

    // 4. HTTP Proxy (uses the URL map)
    const httpProxy = new ComputeTargetHttpProxy(this, "http-proxy", {
      name: `${props.siteName}-http-proxy`,
      urlMap: urlMap.id,
      project: props.project,
    });

    // 5. Global Forwarding Rule (connects IP + Port 80 to HTTP Proxy)
    new ComputeGlobalForwardingRule(this, "http-forwarding-rule", {
      name: `${props.siteName}-http-fw-rule`,
      ipAddress: ipAddress.address,
      ipProtocol: "TCP",
      portRange: "80",
      target: httpProxy.id,
      project: props.project,
      // Ensure proxy exists before creating rule
      dependsOn: [httpProxy],
    });

    // --- Add conditional access - only through Load Balancer ---
    new StorageBucketIamBinding(this, "conditional-public-access", {
      bucket: websiteBucket.name,
      role: "roles/storage.objectViewer",
      members: ["allUsers"],
      dependsOn: [websiteBucket, backendBucket],
    });

    // Upload static files to the bucket
    uploadFilesToGcp(this, websiteBucket, props.sourcePath);
    
    // Output the Load Balancer IP Address
    new TerraformOutput(this, "load_balancer_ip", {
      value: `http://${ipAddress.address}`,
      description: "Public IP Address of the HTTP Load Balancer",
    });

  }
} 
