import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { StorageBucket } from "../../.gen/providers/google/storage-bucket";
import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { Config } from "../config";

export class GcpBackendStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: Config) {
    super(scope, id);

    if (!config.gcpBackend) {
      throw new Error("GCP backend configuration is required");
    }

    new GoogleProvider(this, "google", {
      project: config.gcpProject!,
      region: config.region!,
    });

    new StorageBucket(this, "terraform-state-bucket", {
      name: config.gcpBackend.bucket,
      location: config.region!,
      uniformBucketLevelAccess: true,
      forceDestroy: true,
    });

    new TerraformOutput(this, "gcp_backend_bucket_name", {
      value: config.gcpBackend.bucket,
    });
  }
}
