# Static Website Infrastructure Deployment

This project provides infrastructure code for deploying static websites to AWS, Azure, and GCP using Terraform CDK (CDKTF).

---

## AWS – Static Site

**Prerequisites:**  
- Your app is built in the `landing` project  
- Docker Engine is running

**Steps:**
1. Install [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
2. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
3. [Create an IAM user](https://us-east-1.console.aws.amazon.com/iam/home?region=us-east-1#/users) in AWS Management Console:
    - Go to IAM → Users → Add user or select your user
    - Go to "Security credentials" tab
    - In "Access keys", click "Create access key"
    - Save the Access key ID and Secret access key
4. Configure AWS CLI:
    - `aws configure`
    - Or set environment variables:
      ```
      export AWS_ACCESS_KEY_ID=your-access-key-id
      export AWS_SECRET_ACCESS_KEY=your-secret-access-key
      export AWS_DEFAULT_REGION=your-region
      ```
5. Deploy:
    ```
    pnpm cdktf:deploy
    ```

---

## Azure – Static Site

**Prerequisites:**  
- Your app is built in the `landing` project  
- Docker Engine is running

**Steps:**
1. Install [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
2. Install [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
3. Login:
    ```
    az login
    ```
4. Deploy:
    ```
    pnpm cdktf:deploy
    ```

---

## GCP – Static Site

**Prerequisites:**  
- Your app is built in the `landing` project  
- Docker Engine is running

**Steps:**
1. Install [Terraform CLI](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
2. Create a GCP project and set its ID in your config
3. Enable billing for your project ([link](https://console.cloud.google.com/billing?hl=en&inv=1&invt=AbxAhA&organizationId=0)) and link it to your project
4. Install [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) and login:
    ```
    gcloud auth login
    ```
    - To switch accounts:  
      `gcloud auth login` or `gcloud auth application-default login`
    - Ensure you have permissions:
      ```
      gcloud projects add-iam-policy-binding YOUR_PROJECT_ID --member=user:YOUR_EMAIL --role=roles/storage.admin
      ```
5. Enable Compute Engine API ([link](https://console.cloud.google.com/apis/library/compute.googleapis.com?project=static-site-459410&inv=1&invt=AbxL-Q))
6. Deploy (first deployment may take several minutes):
    ```
    pnpm cdktf:deploy
    ```
    - After deployment, wait 5–10 minutes for all roles and load balancer to be fully enabled

---

## Destroying Infrastructure

To remove all created resources, use:

```
pnpm cdktf:destroy
```

---

## Notes

- Project info and number can be found in GCP dashboard → Project info
- Storage buckets require active billing, even on free tier
- For pricing, see GCP pricing dashboard

---

## Project Structure

- `bin/cdktf-infrastructure.ts`: CDKTF entry point
- `lib/aws-static-deploy.ts`: AWS S3 deployment
- `lib/gcp-static-deploy.ts`: GCP Storage deployment
- `lib/azure-static-deploy.ts`: Azure Storage deployment
- `lib/static-upload.ts`: File upload utilities
- `lib/config.ts`: Configuration management
- `lib/utils.ts`: Utilities
