import { Construct } from 'constructs';
import { S3Bucket } from '@cdktf/provider-aws/lib/s3-bucket';
import { S3BucketWebsiteConfiguration } from '@cdktf/provider-aws/lib/s3-bucket-website-configuration';
import { S3BucketOwnershipControls } from '@cdktf/provider-aws/lib/s3-bucket-ownership-controls';
import { S3BucketPublicAccessBlock } from '@cdktf/provider-aws/lib/s3-bucket-public-access-block';
import { S3BucketPolicy } from '@cdktf/provider-aws/lib/s3-bucket-policy';
import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { CloudfrontDistribution } from '@cdktf/provider-aws/lib/cloudfront-distribution';
import { TerraformOutput } from 'cdktf';
import { StaticSiteProps } from '../interfaces';

export class AwsStaticSite extends Construct {
    constructor(scope: Construct, id: string, props: StaticSiteProps) {
        super(scope, id);

        // 1. S3 Bucket
        const bucket = new S3Bucket(this, 'bucket', {
            bucketPrefix: props.appName, // Use prefix to avoid naming conflicts or props.appName if unique
            forceDestroy: true,
        });

        // 2. Ownership Controls
        const ownershipControls = new S3BucketOwnershipControls(this, 'ownership_controls', {
            bucket: bucket.id,
            rule: {
                objectOwnership: 'BucketOwnerPreferred',
            },
            dependsOn: [bucket],
        });

        // 3. Public Access Block
        const publicAccessBlock = new S3BucketPublicAccessBlock(this, 'public_access_block', {
            bucket: bucket.id,
            blockPublicAcls: false,
            blockPublicPolicy: false,
            ignorePublicAcls: false,
            restrictPublicBuckets: false,
            dependsOn: [bucket, ownershipControls],
        });

        // 4. Website Config
        const websiteConfig = new S3BucketWebsiteConfiguration(this, 'website_configuration', {
            bucket: bucket.id,
            indexDocument: { suffix: "index.html" },
            errorDocument: { key: "404.html" }, // Changed from index.html to 404.html per source, or keep index.html for SPA? Source used 404. Let's start with 404 logic but mapped to index for SPA usually. 
            // Source said: "errorDocument: { key: "404.html" }"
            // But later CloudFront customErrorResponse handles 404 -> index.html.
            dependsOn: [bucket, publicAccessBlock],
        });

        // 5. Bucket Policy
        const policyDoc = new DataAwsIamPolicyDocument(this, 'policy_doc', {
            statement: [{
                effect: 'Allow',
                principals: [{ type: '*', identifiers: ['*'] }],
                actions: ['s3:GetObject'],
                resources: [`${bucket.arn}/*`],
            }],
            dependsOn: [bucket],
        });

        new S3BucketPolicy(this, 's3_bucket_policy', {
            bucket: bucket.id,
            policy: policyDoc.json,
            dependsOn: [bucket, policyDoc, websiteConfig],
        });

        // 6. CloudFront Distribution
        const distribution = new CloudfrontDistribution(this, 'cf_dist', {
            enabled: true,
            isIpv6Enabled: true,
            defaultRootObject: 'index.html',
            origin: [{
                domainName: `${bucket.id}.s3-website.${props.envVars?.AWS_REGION || 'us-east-1'}.amazonaws.com`, // We need region. 
                // Note: S3 Website endpoint format involves region. 
                // props might need region or we assume provider has it.
                // For robust templates, we might use bucket.bucketRegionalDomainName and S3Origin config.
                // Source used: `${s3BucketResource.id}.s3-website.${props.region}.amazonaws.com`
                originId: 'S3Origin',
                customOriginConfig: {
                    httpPort: 80,
                    httpsPort: 443,
                    originProtocolPolicy: 'http-only',
                    originSslProtocols: ['TLSv1.2'],
                },
            }],
            defaultCacheBehavior: {
                allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
                cachedMethods: ['GET', 'HEAD'],
                targetOriginId: 'S3Origin',
                forwardedValues: {
                    queryString: true,
                    cookies: { forward: 'none' },
                    headers: ["Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"],
                },
                viewerProtocolPolicy: 'redirect-to-https',
                minTtl: 0,
                defaultTtl: 3600,
                maxTtl: 86400,
                compress: true,
            },
            customErrorResponse: [
                { errorCode: 403, responseCode: 200, responsePagePath: '/index.html' },
                { errorCode: 404, responseCode: 200, responsePagePath: '/index.html' }, // SPA support: 404 -> index
            ],
            restrictions: { geoRestriction: { restrictionType: 'none' } },
            viewerCertificate: { cloudfrontDefaultCertificate: true },
            dependsOn: [bucket, websiteConfig],
        });

        // TODO: Upload Logic
        // uploadFilesToAws(this, bucket.id, props.distPath);

        new TerraformOutput(this, 'website_url', { value: `http://${bucket.websiteEndpoint}` });
        new TerraformOutput(this, 'cloudfront_url', { value: `https://${distribution.domainName}` });
    }
}
