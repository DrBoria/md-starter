# MD Starter (`md-starter`)

The Ultimate Monorepo Generator "Sculptor". Start your project with a production-ready foundation.

## 🚀 Usage

### Initialize a new project
```bash
npx create-md-starter init <project-name>
# or
npm init md-starter <project-name>
```
Follow the interactive prompts to set up your monorepo.

### Add a new application
Inside your monorepo:
```bash
npx md-starter add
```
Select what to add:
1.  **New Application**:
    *   **Landing**: Next.js marketing site.
    *   **Keystone**: Headless CMS & Backend.
    *   **Native**: Expo / React Native mobile app.
    *   **UI Kit**: Styleguidist library.
2.  **Shared Package / Feature**:
    *   Add or update shared libraries like `@md/components`, `@md/utils`, `@md/ui-kit` (Native), etc.


## ✨ Features

*   **Sculptor Pattern**: Clones full templates and prunes unused code/components based on your choices.
*   **Polymorphic Infrastructure**: Automatically generates Terraform (CDKTF) for AWS, GCP, Azure, or Custom servers.
*   **Monorepo Ready**: Turborepo, PNPM, shared packages (`@md/components`, `@md/utils`).

## Documentation

For full documentation, visit the [GitHub Repository](https://github.com/DrBoria/md-starter).
