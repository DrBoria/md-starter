import { Construct } from 'constructs';
import { TerraformStack } from 'cdktf';
import * as aws from '@cdktf/provider-aws';
import { Config } from '../config';

export class AwsBackendStack extends TerraformStack {
  constructor(scope: Construct, id: string, config: Config) {
    super(scope, id);

    if (config.provider !== 'aws' || config.backendType !== 'remote' || !config.awsBackend) {
        throw new Error("AWS remote backend configuration is required in cloud-config.json to deploy the AWS backend stack.");
    }

    const { bucket, region, dynamodbTable } = config.awsBackend;

    if (!bucket || !region || !dynamodbTable) {
         throw new Error("AWS backend configuration (bucket, region, dynamodbTable) is incomplete in cloud-config.json.");
    }

    new aws.provider.AwsProvider(this, 'aws', {
      region: region,
    });

    // Create S3 bucket for Terraform state
    const stateBucket = new aws.s3Bucket.S3Bucket(this, 'terraform-state-bucket', {
      bucket: bucket,
      tags: {
        Name: `${bucket}-tfstate`,
        ManagedBy: 'cdktf',
      },
    });
    
    new aws.s3BucketVersioning.S3BucketVersioningA(this, 'terraform-state-bucket-versioning', {
      bucket: stateBucket.id,
      versioningConfiguration: {
        status: 'Enabled',
      },
    });

    // Create DynamoDB table for state locking
    new aws.dynamodbTable.DynamodbTable(this, 'terraform-state-lock', {
      name: dynamodbTable,
      hashKey: 'LockID',
      attribute: [
        {
          name: 'LockID',
          type: 'S',
        },
      ],
      billingMode: 'PAY_PER_REQUEST',
      tags: {
        Name: `${dynamodbTable}-tfstate-lock`,
        ManagedBy: 'cdktf',
      },
    });
  }
}
