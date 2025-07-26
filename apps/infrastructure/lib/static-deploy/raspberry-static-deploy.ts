import { Construct } from "constructs";
import { TerraformStack, TerraformOutput } from "cdktf";
import { NullProvider } from "@cdktf/provider-null/lib/provider";
import { Resource } from "@cdktf/provider-null/lib/resource";
import { uploadFilesToRaspberry } from "./static-upload";
import * as glob from "glob";

interface RaspberryStaticDeployProps {
  siteName: string;
  sourcePath: string;
  hostIp: string;
  sshUser: string;
  sshKeyPath?: string;
  nginxPort?: number;
}

export class RaspberryStaticDeploy extends TerraformStack {
  constructor(scope: Construct, id: string, props: RaspberryStaticDeployProps) {
    super(scope, id);

    const sshUser: string = props.sshUser;
    const nginxPort: number = props.nginxPort || 80;
    const siteDir = `/var/www/${props.siteName}`;
    const nginxConfigPath = `/etc/nginx/sites-available/${props.siteName}`;
    const nginxEnabledPath = `/etc/nginx/sites-enabled/${props.siteName}`;
    const sshCmd = props.sshKeyPath 
      ? `ssh -i ${props.sshKeyPath} -o StrictHostKeyChecking=no`
      : `ssh -o StrictHostKeyChecking=no`;
    const scpCmd = props.sshKeyPath 
      ? `scp -i ${props.sshKeyPath} -o StrictHostKeyChecking=no`
      : `scp -o StrictHostKeyChecking=no`;

    new NullProvider(this, "null");

    // Create nginx configuration content
    const nginxConfig = `server {
    listen ${nginxPort};
    listen [::]:${nginxPort};
    
    server_name _;
    root ${siteDir};
    index index.html;

    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Handle client-side routing (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security - deny access to hidden files
    location ~ /\\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}`;

    // Step 1: Install nginx and create directories
    const setupNginx = new Resource(this, "setup_nginx", {
      triggers: {
        site_name: props.siteName,
        host_ip: props.hostIp,
        ssh_user: sshUser,
        timestamp: Date.now().toString(),
      },
      provisioners: [
        {
          type: "local-exec",
          command: `
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo apt-get update -y >/dev/null 2>&1
              sudo apt-get install -y nginx rsync >/dev/null 2>&1
              sudo mkdir -p ${siteDir}
              sudo chown -R www-data:www-data ${siteDir}
              sudo chmod -R 755 ${siteDir}
              sudo rm -f /etc/nginx/sites-enabled/default
              sudo systemctl enable nginx >/dev/null 2>&1
              sudo systemctl start nginx >/dev/null 2>&1
            '
          `
        },
        {
          type: "local-exec",
          when: "destroy",
          command: `
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo systemctl stop nginx >/dev/null 2>&1 || true
              sudo rm -f ${nginxEnabledPath} >/dev/null 2>&1 || true
              sudo rm -f ${nginxConfigPath} >/dev/null 2>&1 || true
              sudo rm -rf ${siteDir} >/dev/null 2>&1 || true
              sudo systemctl start nginx >/dev/null 2>&1 || true
            ' || true
          `
        }
      ]
    });

    // Step 2: Configure nginx
    const configureNginx = new Resource(this, "configure_nginx", {
      triggers: {
        config_hash: Buffer.from(nginxConfig).toString('base64'),
        site_name: props.siteName,
        setup_id: setupNginx.id,
      },
      provisioners: [
        {
          type: "local-exec",
          command: `
            echo '${nginxConfig}' > /tmp/${props.siteName}.conf
            ${scpCmd} /tmp/${props.siteName}.conf ${sshUser}@${props.hostIp}:/tmp/
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo mv /tmp/${props.siteName}.conf ${nginxConfigPath}
              sudo ln -sf ${nginxConfigPath} ${nginxEnabledPath}
              sudo nginx -t >/dev/null 2>&1
              sudo systemctl reload nginx >/dev/null 2>&1
            '
            rm -f /tmp/${props.siteName}.conf
          `
        },
        {
          type: "local-exec",
          when: "destroy",
          command: `
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo rm -f ${nginxEnabledPath} >/dev/null 2>&1 || true
              sudo rm -f ${nginxConfigPath} >/dev/null 2>&1 || true
              sudo systemctl reload nginx >/dev/null 2>&1 || true
            ' || true
          `
        }
      ],
      dependsOn: [setupNginx]
    });

    // Step 3: Upload files using shared function like other cloud stacks
    const uploadFiles = uploadFilesToRaspberry(
      this,
      sshCmd,
      sshUser,
      props.hostIp,
      props.sourcePath,
      siteDir,
      [configureNginx]
    );

    // Add provisioners for actual file upload
    const uploadFilesExec = new Resource(this, "upload_files_exec", {
      triggers: {
        upload_id: uploadFiles.id,
        files_hash: this.getFilesHash(props.sourcePath),
      },
      provisioners: [
        {
          type: "local-exec",
          command: `
            rsync -avz --delete -e "${sshCmd}" ${props.sourcePath}/ ${sshUser}@${props.hostIp}:/tmp/site-upload/
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo rm -rf ${siteDir}/*
              sudo mv /tmp/site-upload/* ${siteDir}/
              sudo chown -R www-data:www-data ${siteDir}
              sudo chmod -R 755 ${siteDir}
              sudo rm -rf /tmp/site-upload
            '
          `
        },
        {
          type: "local-exec",
          when: "destroy",
          command: `
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo rm -rf ${siteDir}/*
            ' || true
          `
        }
      ],
      dependsOn: [uploadFiles]
    });

    // Step 4: Final setup
    const finalizeDeployment = new Resource(this, "finalize_deployment", {
      triggers: {
        upload_id: uploadFilesExec.id,
        timestamp: Date.now().toString(),
      },
      provisioners: [
        {
          type: "local-exec",
          command: `
            ${sshCmd} ${sshUser}@${props.hostIp} '
              sudo chown -R www-data:www-data ${siteDir}
              sudo chmod -R 755 ${siteDir}
              sudo nginx -t >/dev/null 2>&1
              sudo systemctl restart nginx >/dev/null 2>&1
            '
          `
        }
      ],
      dependsOn: [uploadFilesExec]
    });

    // Output deployment information
    new TerraformOutput(this, "raspberry_website_url", {
      value: `http://${props.hostIp}${nginxPort !== 80 ? `:${nginxPort}` : ''}`,
      description: "URL of the Raspberry Pi hosted website",
    });

    new TerraformOutput(this, "raspberry_ssh_info", {
      value: `ssh ${sshUser}@${props.hostIp}`,
      description: "SSH connection string for Raspberry Pi",
    });

    new TerraformOutput(this, "deployment_status", {
      value: "deployment_completed",
      description: "Status of the deployment",
    });

    new TerraformOutput(this, "deployment_timestamp", {
      value: new Date().toISOString(),
      description: "Timestamp of the deployment",
    });
  }

  private getFilesHash(sourcePath: string): string {
    const files = glob.sync(`${sourcePath}/**/*`, { nodir: true });
    return Buffer.from(files.join(',')).toString('base64');
  }
} 
