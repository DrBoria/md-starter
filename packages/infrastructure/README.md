# @md/infrastructure

A polymorphic infrastructure library for the Ultimate Monorepo. Define your app's needs once, deploy anywhere.

## 📦 Installation

This package is typically installed automatically by `create-md-stack` in your generated `apps/*/infrastructure` folder.

```bash
pnpm add @md/infrastructure
```

## ☁️ Supported Providers

| Strategy | AWS | GCP | Azure | Custom |
|----------|-----|-----|-------|--------|
| **Static** | S3 + CloudFront | GCS + Load Balancer | Storage Account | N/A |
| **Container**| Fargate + RDS | Cloud Run | Container Apps | Docker (SSH)|
| **VM** | EC2 + Docker | Compute Engine | N/A | N/A |

## 🛠️ Usage

This library exports high-level constructs that implement the `Construct` interface from `constructs` (CDKTF).

```typescript
import { AwsFargateApp } from '@md/infrastructure'; // or GcpCloudRunApp, AzureContainerApp

new AwsFargateApp(this, 'my-app', {
    appName: 'my-cool-app',
    dockerImage: 'my-org/image:latest',
    port: 3000,
    envVars: {
        DATABASE_URL: '...'
    }
});
```
