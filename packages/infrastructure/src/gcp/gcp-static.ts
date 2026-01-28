import { Construct } from 'constructs';
import { StorageBucket } from '@cdktf/provider-google/lib/storage-bucket';
import { ComputeBackendBucket } from '@cdktf/provider-google/lib/compute-backend-bucket';
import { ComputeUrlMap } from '@cdktf/provider-google/lib/compute-url-map';
import { ComputeTargetHttpProxy } from '@cdktf/provider-google/lib/compute-target-http-proxy';
import { ComputeGlobalForwardingRule } from '@cdktf/provider-google/lib/compute-global-forwarding-rule';
import { ComputeGlobalAddress } from '@cdktf/provider-google/lib/compute-global-address';
import { StorageBucketIamBinding } from '@cdktf/provider-google/lib/storage-bucket-iam-binding';
import { TerraformOutput } from 'cdktf';
import { StaticSiteProps } from '../interfaces';

export class GcpStaticSite extends Construct {
    constructor(scope: Construct, id: string, props: StaticSiteProps) {
        super(scope, id);

        // 1. Storage Bucket
        const bucket = new StorageBucket(this, 'bucket', {
            name: props.appName, // Ensure uniqueness or use prefix
            location: 'US', // Should be configurable
            website: {
                mainPageSuffix: 'index.html',
                notFoundPage: 'index.html' // SPA fallback
            },
            forceDestroy: true,
            uniformBucketLevelAccess: true
        });

        // 2. Load Balancer IP
        const ipAddress = new ComputeGlobalAddress(this, 'lb_ip', {
            name: `${props.appName}-lb-ip`
        });

        // 3. Backend Bucket (CDN)
        const backendBucket = new ComputeBackendBucket(this, 'backend', {
            name: `${props.appName}-backend`,
            bucketName: bucket.name,
            enableCdn: true,
            dependsOn: [bucket]
        });

        // 4. URL Map
        const urlMap = new ComputeUrlMap(this, 'url_map', {
            name: `${props.appName}-url-map`,
            defaultService: backendBucket.id
        });

        // 5. HTTP Proxy
        const proxy = new ComputeTargetHttpProxy(this, 'proxy', {
            name: `${props.appName}-proxy`,
            urlMap: urlMap.id
        });

        // 6. Forwarding Rule
        new ComputeGlobalForwardingRule(this, 'rule', {
            name: `${props.appName}-fw-rule`,
            ipAddress: ipAddress.address,
            ipProtocol: 'TCP',
            portRange: '80',
            target: proxy.id,
            dependsOn: [proxy]
        });

        // 7. Public Access via LB only (conceptually, or just public reader)
        new StorageBucketIamBinding(this, 'public_access', {
            bucket: bucket.name,
            role: 'roles/storage.objectViewer',
            members: ['allUsers'],
            dependsOn: [bucket] // Source had dependsOn backendBucket too
        });

        // TODO: Upload Logic
        // uploadFilesToGcp(this, bucket, props.distPath);

        new TerraformOutput(this, 'load_balancer_ip', { value: `http://${ipAddress.address}` });
    }
}
