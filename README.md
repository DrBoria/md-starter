# Ultimate Monorepo Generator (`md-starter`)

The **Ultimate Monorepo Generator** is a "Sculptor" tool for building robust, scalable applications. Instead of generating minimal boilerplate, it clones production-ready "Master Templates" and sculpts them to fit your needs by removing unused features, components, and configurations.

It includes a **Polymorphic Infrastructure** layer, allowing you to deploy the same application to AWS, GCP, Azure, or even a Raspberry Pi without changing your application code.

## 🚀 Getting Started

Initialize a new monorepo:

```bash
npx create-md-stack init my-stack
cd my-stack
pnpm install
```

## 🏗️ Creating Apps

The `md-starter` (aliased as `create-md-stack`) CLI allows you to add full-stack applications to your monorepo.

```bash
# General usage
npx create-md-stack add
```

### 📦 Available Templates

| Template | Description | Tech Stack |
|----------|-------------|------------|
| **Landing** | High-performance marketing site | Next.js, React, Tailwind |
| **Keystone** | Headless CMS & Backend | KeystoneJS, PostgreSQL, GraphQL |
| **Native** | Mobile Application | Expo, React Native |
| **UI Kit** | Component Library Strategy | Styleguidist, React |

### 🗿 The "Sculptor" Approach

When you select a template, the CLI:
1.  **Clones** the full "Master Template" (e.g., `_template-landing`).
2.  **Prunes** unused components (e.g., removes `HeroVideo` if you only checked `HeroSimple`).
3.  **Refactors** code using AST (Abstract Syntax Tree) transformations to remove imports and JSX usage.
4.  **Configures** infrastructure based on your deployment choice.

---

## ☁️ Polymorphic Infrastructure

The `packages/infrastructure` library abstracts away cloud provider complexity. You write code against interfaces (`ContainerAppProps`, `StaticSiteProps`), and the CLI generates the concrete Terraform (CDKTF) or config files.

### Support Matrix

| Strategy | AWS | GCP | Azure | Custom (RPi) |
|----------|-----|-----|-------|--------------|
| **Static** | S3 + CloudFront | GCS + Load Balancer + CDN | Storage Account ($web) | N/A |
| **Container** | ECS Fargate | Cloud Run | Container Apps | Docker (SSH) |
| **VM** | EC2 + Docker | Compute Engine | *Coming Soon* | *Coming Soon* |

### Example usage (CLI)

```bash
? Include infrastructure configuration? Yes
? Select Deployment Strategy: Container
? Select Provider: AWS (Fargate)
```

This will automatically:
1.  Generate `infrastructure/main.ts` using `AwsFargateApp`.
2.  Configure necessary dependencies (VPC, ALB, RDS).
3.  Clean up unused files (e.g., removing `Dockerfile` if you chose Static).

---

## 🛠️ Architecture

```plaintext
my-stack/
├── apps/
│   ├── _template-landing/    <-- Source of Truth (Next.js)
│   ├── _template-keystone/   <-- Source of Truth (CMS)
│   └── my-app/               <-- Generated App
│
├── packages/
│   ├── cli/                  <-- The Generator (@md/cli)
│   ├── infrastructure/       <-- Cloud Constructs (@md/infrastructure)
│   ├── components/           <-- Shared UI
│   └── ...
```

## 📜 Development

```bash
# Build the CLI
pnpm build --filter @md/cli

# Run generation locally
cd packages/cli
npm run start add
```
