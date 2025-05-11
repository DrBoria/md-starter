import { Construct } from 'constructs';
import { TerraformStack, TerraformOutput } from 'cdktf';
import * as aws from '@cdktf/provider-aws';
import { DataExternal } from '@cdktf/provider-external/lib/data-external';
import { ExternalProvider } from '@cdktf/provider-external/lib/provider';
import { uploadFilesToAws } from './static-upload';

interface AwsStaticDeployProps {
  region: string;
  siteName: string;
  sourcePath: string;
}

export class AwsStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: AwsStaticDeployProps) {
    super(scope, id);

    new aws.provider.AwsProvider(this, 'aws_provider', {
      region: props.region,
    });

    new ExternalProvider(this, 'external_provider');

    const bucketExists = new DataExternal(this, 'bucket_exists_check', {
      program: ['bash', '-c', `aws s3api head-bucket --bucket "${props.siteName}" --region "${props.region}" >/dev/null 2>&1 && echo '{"exists": "true"}' || echo '{"exists": "false"}'`],
      query: {
        exists: "",
      },
    });

    const s3BucketResource = new aws.s3Bucket.S3Bucket(this, 'static_site_s3_bucket', {
      bucket: props.siteName,
      forceDestroy: true,
      count: bucketExists.getStringAttribute('exists') === 'false' ? 1 : 0,
    });

    new aws.s3BucketOwnershipControls.S3BucketOwnershipControls(this, 'ownership_controls', {
      bucket: props.siteName,
      rule: {
        objectOwnership: 'BucketOwnerPreferred',
      },
    });

    new aws.s3BucketPublicAccessBlock.S3BucketPublicAccessBlock(this, 'public_access_block', {
      bucket: props.siteName,
      blockPublicAcls: false,
      blockPublicPolicy: false,
      ignorePublicAcls: false,
      restrictPublicBuckets: false,
    });

    new aws.s3BucketWebsiteConfiguration.S3BucketWebsiteConfiguration(this, 'website_configuration', {
      bucket: props.siteName,
      indexDocument: { suffix: "index.html" },
      errorDocument: { key: "404.html" },
    });

    const policyDocument = new aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument(this, 'bucket_policy_document', {
      statement: [
        {
          effect: 'Allow',
          principals: [
            {
              type: '*',
              identifiers: ['*'],
            },
          ],
          actions: ['s3:GetObject'],
          resources: [`arn:aws:s3:::${props.siteName}/*`],
        },
      ],
    });

    new aws.s3BucketPolicy.S3BucketPolicy(this, 's3_bucket_policy', {
      bucket: props.siteName,
      policy: policyDocument.json,
    });

    uploadFilesToAws(this, props.siteName, props.sourcePath);

    const websiteUrl = `http://${props.siteName}.s3-website-${props.region}.amazonaws.com`;
    new TerraformOutput(this, 'website_url_output', {
      value: websiteUrl,
      description: 'The static website URL',
    });

    new TerraformOutput(this, 'bucket_name_output', {
      value: props.siteName,
      description: 'The name of the S3 bucket',
    });
  }
}
