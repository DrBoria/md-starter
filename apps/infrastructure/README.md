# Infrastructure for Static Website Deployment

This project contains infrastructure code to deploy static websites to different cloud providers.

## CDK for AWS

The `cdk.json` file tells the CDK Toolkit how to execute the AWS CDK app.

### AWS CDK Commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Terraform CDK for Multi-Cloud Deployment

This project also uses Terraform CDK (CDKTF) to deploy static website files to various cloud providers (AWS, GCP, Azure).

### Prerequisites

- Node.js (v18 or later)
- Terraform CLI installed (v1.0.0 or later)
- AWS, GCP, or Azure accounts with appropriate permissions
- Configured provider-specific CLI tools:
  - AWS: AWS CLI configured with credentials
  - GCP: Google Cloud SDK installed and configured
  - Azure: Azure CLI installed and logged in

### Setup

1. Install dependencies:

```bash
npm install
```

2. Create a configuration file:

Create a file named `cloud-config.json` in the project root, based on the `cloud-config.example.json` template:

```json
{
  "provider": "aws",
  "siteName": "your-site-name",
  
  "awsRegion": "us-east-1",
  
  "gcpProject": "your-gcp-project-id",
  "gcpRegion": "us-central1",
  
  "azureLocation": "East US",
  "azureResourceGroup": "your-resource-group"
}
```

3. Build the Landing site:

```bash
cd ../landing
npm run build
```

### Deployment

Deploy to your selected cloud provider:

```bash
npm run cdktf:deploy
```

The provider is selected in the `cloud-config.json` file or through the `CLOUD_PROVIDER` environment variable.

### Switching Cloud Providers

To switch between cloud providers, either:

1. Edit the `cloud-config.json` file and change the `provider` value to `aws`, `gcp`, or `azure`.
2. Use an environment variable:

```bash
CLOUD_PROVIDER=aws npm run cdktf:deploy
CLOUD_PROVIDER=gcp npm run cdktf:deploy
CLOUD_PROVIDER=azure npm run cdktf:deploy
```

### Clean Up

To destroy resources:

```bash
npm run cdktf:destroy
```

### CDKTF Structure

- `bin/cdktf-infrastructure.ts`: Main entry point for CDKTF
- `lib/aws-static-deploy.ts`: AWS S3 static site deployment
- `lib/gcp-static-deploy.ts`: GCP Storage static site deployment
- `lib/azure-static-deploy.ts`: Azure Storage static site deployment
- `lib/static-upload.ts`: File upload utilities for each cloud provider
- `lib/config.ts`: Configuration management
- `lib/utils.ts`: Utility functions
