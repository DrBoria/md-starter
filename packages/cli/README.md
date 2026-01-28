# Create MD Stack (`create-md-stack`)

The Ultimate Monorepo Generator "Sculptor". Start your project with a production-ready foundation.

## 🚀 Usage

### Initialize a new project
```bash
npx create-md-stack init <project-name>
# or
npm init md-stack <project-name>
```
Follow the interactive prompts to set up your monorepo.

### Add a new application
Inside your monorepo:
```bash
npx create-md-stack add
```
Select from available templates:
*   **Landing**: Next.js marketing site.
*   **Keystone**: Headless CMS & Backend.
*   **Native**: Expo / React Native mobile app.
*   **UI Kit**: Styleguidist library.

## ✨ Features

*   **Sculptor Pattern**: Clones full templates and prunes unused code/components based on your choices.
*   **Polymorphic Infrastructure**: Automatically generates Terraform (CDKTF) for AWS, GCP, Azure, or Custom servers.
*   **Monorepo Ready**: Turborepo, PNPM, shared packages (`@md/components`, `@md/utils`).

## Documentation

For full documentation, visit the [GitHub Repository](https://github.com/DrBoria/md-starter).
