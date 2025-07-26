# Multi-Cloud Static Website Infrastructure

This infrastructure project supports deploying static websites (Next.js static exports) to AWS, GCP, Azure, and Raspberry Pi using CDK for Terraform (CDKTF).

## Features

- **Multi-cloud support**: AWS, GCP, Azure, Raspberry Pi
- **Remote state management**: Optional remote backend for Terraform state
- **Next.js routing support**: Proper handling of client-side routing
- **Unified configuration**: Single config file for all providers
- **Separate deployment**: Backend and static hosting can be deployed independently
- **Local deployment**: Deploy to Raspberry Pi in your local network using SSH and nginx

## Configuration

Configure your deployment using `cloud-config.json`:

```json
{
  "provider": "aws",
  "siteName": "my-static-site",
  "backendType": "remote",
  "region": "eu-central-1",
  
  "gcpProject": "my-gcp-project",
  "gcpProjectNumber": "123456789"
}
```

### Configuration Options

- `provider`: Cloud provider (`"aws"`, `"gcp"`, `"azure"`, or `"raspberry"`)
- `siteName`: Name for your site (used to generate resource names)
- `backendType`: `"local"` or `"remote"` for Terraform state storage
- `region`: Region for deployment
- `gcpProject`: GCP project ID (required for GCP)
- `gcpProjectNumber`: GCP project number (required for GCP)

#### Raspberry Pi Specific Options
- `hostIp`: IP address of your Raspberry Pi (required for Raspberry Pi)
- `sshUser`: SSH username (default: "borisbritva")
- `sshKeyPath`: Path to SSH private key (optional, defaults to password auth)
- `nginxPort`: Nginx port (default: 80)

### Auto-generated Resources

When `backendType` is `"remote"`, the following resources are auto-generated based on `siteName`:

**AWS:**
- S3 bucket: `tfstate-{siteName}`
- DynamoDB table: `tflock-{siteName}`

**GCP:**
- Storage bucket: `tfstate-{siteName}`

**Azure:**
- Resource group: `{siteName}-rg`
- Storage account: `tfstate{siteName}` (sanitized)
- Container: `tfstate`

## Scripts

### Build and Synthesis
```bash
pnpm build                # Build TypeScript
pnpm synth                # Synthesize all stacks
```

### Deployment
```bash
pnpm deploy:backend      # Deploy remote backend only
pnpm deploy:landing      # Deploy next.js landing only
pnpm deploy:raspberry    # Deploy to Raspberry Pi
```

### Destruction
```bash
pnpm destroy:backend     # Destroy remote backend only
pnpm destroy:landing     # Destroy next.js landing stack only
pnpm destroy:raspberry   # Destroy Raspberry Pi deployment
```

## Deployment Workflow

### 1. Initial Setup (with Remote Backend)

1. Configure `cloud-config.json` with `"backendType": "remote"`
2. Deploy the backend infrastructure first:
   ```bash
   pnpm deploy:backend
   ```
3. Deploy the static hosting:
   ```bash
   pnpm deploy:static
   ```

### 2. Subsequent Deployments

For updates to your static site, you only need to redeploy the static hosting stack:
```bash
pnpm deploy:static
```

### 3. Local State (Development)

For development, you can use local state:
```json
{
  "backendType": "local"
}
```

Then deploy directly:
```bash
pnpm cdktf:deploy
```

## Cloud Provider Features

### AWS
- **S3 Static Website Hosting**: Optimized for static sites
- **CloudFront CDN**: Global content delivery with HTTPS
- **Client-side Routing**: 403/404 errors redirect to index.html/404.html
- **Remote State**: S3 + DynamoDB for state locking

### GCP
- **Cloud Storage**: Static website hosting
- **Load Balancer + Cloud CDN**: Global distribution with CDN
- **Client-side Routing**: Proper index.html/404.html handling
- **Remote State**: Cloud Storage backend

### Azure
- **Storage Account Static Websites**: Built-in static hosting
- **Client-side Routing**: Automatic index.html/404.html handling
- **Remote State**: Storage Account backend
- **Auto-generated Resource Groups**: Based on siteName

## Next.js Static Export

This infrastructure is designed to work with Next.js static exports. Make sure your Next.js app is configured for static export:

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

Build your static site:
```bash
# In your Next.js app
npm run build
```

The generated `out/` directory will be uploaded to your cloud provider.

## Environment Variables

You can also configure via environment variables:

```bash
export CLOUD_PROVIDER=aws
export SITE_NAME=my-site
export BACKEND_TYPE=remote
export REGION=eu-central-1
export GCP_PROJECT=my-gcp-project
export GCP_PROJECT_NUMBER=123456789
export SOURCE_PATH=../landing/out
```

## Troubleshooting

### Build Errors
If you encounter TypeScript errors from node_modules, they are likely from library type conflicts. The build should still succeed with `skipLibCheck: true` in tsconfig.json.

### Deployment Errors
- Ensure you have valid cloud credentials configured
- Check that required fields are set in cloud-config.json
- For GCP, ensure `GOOGLE_CREDENTIALS` environment variable is set

### State Management
- Backend stack must be deployed before static hosting when using remote state
- If you change `backendType`, you may need to migrate state manually
- Remote backends are created automatically based on siteName

## Architecture

```
┌─────────────────┐    ┌─────────────────┐
│  remote-backend │    │ static-hosting  │
│     stack       │    │     stack       │
├─────────────────┤    ├─────────────────┤
│ • State storage │    │ • Static files  │
│ • State locking │    │ • CDN/LB setup  │
│ • Auto-named    │    │ • DNS/SSL       │
└─────────────────┘    └─────────────────┘
```

Both stacks are independent and can be managed separately, enabling flexible deployment workflows.

## Raspberry Pi Deployment

The Raspberry Pi provider allows you to deploy your static website to a Raspberry Pi on your local network using SSH and nginx.

### Prerequisites

1. Raspberry Pi with SSH access enabled
2. User with sudo privileges (default: "borisbritva")
3. Network connectivity between your machine and Raspberry Pi

### Configuration Example

```json
{
  "provider": "raspberry",
  "siteName": "my-raspberry-site",
  "backendType": "local",
  "hostIp": "192.168.1.100",
  "sshUser": "borisbritva",
  "sshKeyPath": "~/.ssh/id_rsa",
  "nginxPort": 80
}
```

### What It Does

1. **Installs nginx** on the Raspberry Pi automatically
2. **Creates nginx configuration** with SPA routing support
3. **Uploads static files** using rsync for efficiency
4. **Sets up proper permissions** for www-data user
5. **Enables gzip compression** and security headers
6. **Generates deployment script** for manual execution

### Deployment Process

1. Configure `cloud-config.json` with Raspberry Pi settings
2. Build your Next.js app: `pnpm build`
3. Deploy: `pnpm deploy:raspberry`
4. The system will generate a deployment script and show outputs including:
   - Website URL: `http://192.168.1.100`
   - SSH connection string
   - Path to deployment script

### Manual Deployment

If you prefer to run the deployment manually, CDKTF will generate a shell script (e.g., `deploy-my-raspberry-site.sh`) that you can execute:

```bash
./lib/static-deploy/deploy-my-raspberry-site.sh
```

This script handles all the deployment steps with colored output and error handling.

### Features

- **Automatic nginx installation** and configuration
- **SPA routing support** with fallback to index.html
- **Static asset caching** with proper headers
- **Security headers** and hidden file protection
- **Rsync-based file upload** for efficient transfers
- **Proper permissions** setup for www-data
- **Colored deployment output** with progress indicators

### Troubleshooting

- Ensure SSH key authentication is set up if using `sshKeyPath`
- Verify the Raspberry Pi IP address is correct and accessible
- Check that the SSH user has sudo privileges
- Default nginx logs are available at `/var/log/nginx/error.log`
