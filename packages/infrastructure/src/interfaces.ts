// Common properties for all apps
export interface BaseAppProps {
    appName: string;
    envVars?: Record<string, string>;
}

// 1. Static Sites (S3, GCS, Vercel)
export interface StaticSiteProps extends BaseAppProps {
    distPath: string; // Absolute path to build artifacts
    domain?: string;
}

// 2. Container Apps (Docker, Port) - Abstract
export interface ContainerAppProps extends BaseAppProps {
    dockerImage: string; // e.g., "ghcr.io/user/app:latest"
    port: number;        // Container port (e.g., 3000)
}

// 3. Virtual Machines (EC2, Compute Engine, RPi)
// Extends Container props because we usually run Docker on them via user-data
export interface VirtualMachineProps extends ContainerAppProps {
    instanceType?: string; // e.g., "t3.micro", "e2-small"
    // SSH key, etc. could go here
}
