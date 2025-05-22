import { Construct } from 'constructs';
import { TerraformStack, TerraformOutput } from 'cdktf';
import * as aws from '@cdktf/provider-aws';
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

    // Create S3 bucket without conditional logic
    const s3BucketResource = new aws.s3Bucket.S3Bucket(this, 'static_site_s3_bucket', {
      bucket: props.siteName,
      forceDestroy: true,
    });

    // Configure bucket ownership
    const ownershipControls = new aws.s3BucketOwnershipControls.S3BucketOwnershipControls(this, 'ownership_controls', {
      bucket: s3BucketResource.id,
      rule: {
        objectOwnership: 'BucketOwnerPreferred',
      },
      dependsOn: [s3BucketResource],
    });

    // Configure public access
    const publicAccessBlock = new aws.s3BucketPublicAccessBlock.S3BucketPublicAccessBlock(this, 'public_access_block', {
      bucket: s3BucketResource.id,
      blockPublicAcls: false,
      blockPublicPolicy: false,
      ignorePublicAcls: false,
      restrictPublicBuckets: false,
      dependsOn: [s3BucketResource, ownershipControls],
    });

    // Configure website settings
    const websiteConfig = new aws.s3BucketWebsiteConfiguration.S3BucketWebsiteConfiguration(this, 'website_configuration', {
      bucket: s3BucketResource.id,
      indexDocument: { suffix: "index.html" },
      errorDocument: { key: "404.html" },
      dependsOn: [s3BucketResource, publicAccessBlock],
    });

    // Create bucket policy for public read access
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
          resources: [`${s3BucketResource.arn}/*`],
        },
      ],
      dependsOn: [s3BucketResource],
    });

    // Apply bucket policy
    const bucketPolicy = new aws.s3BucketPolicy.S3BucketPolicy(this, 's3_bucket_policy', {
      bucket: s3BucketResource.id,
      policy: policyDocument.json,
      dependsOn: [s3BucketResource, policyDocument, websiteConfig],
    });

    // Create CloudFront distribution for proper client-side routing
    const distribution = new aws.cloudfrontDistribution.CloudfrontDistribution(this, 'cloudfront_distribution', {
      enabled: true,
      isIpv6Enabled: true,
      defaultRootObject: 'index.html',
      origin: [
        {
          domainName: `${s3BucketResource.id}.s3-website-${props.region}.amazonaws.com`,
          originId: 'S3Origin',
          customOriginConfig: {
            httpPort: 80,
            httpsPort: 443,
            originProtocolPolicy: 'http-only',
            originSslProtocols: ['TLSv1.2'],
          },
        },
      ],
      defaultCacheBehavior: {
        allowedMethods: ['GET', 'HEAD'],
        cachedMethods: ['GET', 'HEAD'],
        targetOriginId: 'S3Origin',
        forwardedValues: {
          queryString: false,
          cookies: { forward: 'none' },
        },
        viewerProtocolPolicy: 'redirect-to-https',
        minTtl: 0,
        defaultTtl: 3600,
        maxTtl: 86400,
      },
      // Route 403/404 errors to index.html to support client-side routing
      customErrorResponse: [
        { errorCode: 403, responseCode: 200, responsePagePath: '/index.html' },
        { errorCode: 404, responseCode: 200, responsePagePath: '/404.html' },
      ],
      restrictions: { geoRestriction: { restrictionType: 'none' } },
      viewerCertificate: { cloudfrontDefaultCertificate: true },
      dependsOn: [s3BucketResource, websiteConfig, bucketPolicy],
    });

    // Wait for all dependencies before uploading files
    uploadFilesToAws(this, s3BucketResource.id, props.sourcePath);

    // Output S3 website URL
    const websiteUrl = `http://${s3BucketResource.id}.s3-website-${props.region}.amazonaws.com`;
    new TerraformOutput(this, 'website_url_output', {
      value: websiteUrl,
      description: 'The S3 website URL',
    });

    // Output bucket name
    new TerraformOutput(this, 'bucket_name_output', {
      value: s3BucketResource.id,
      description: 'The name of the S3 bucket',
    });

    // Output CloudFront URL (use this for production)
    new TerraformOutput(this, 'cloudfront_url_output', {
      value: `https://${distribution.domainName}`,
      description: 'The CloudFront distribution URL',
    });
  }
}
