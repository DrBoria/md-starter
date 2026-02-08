
import type { NextConfig } from 'next';
import path from 'path';

const config: NextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@md/components': path.join(process.cwd(), '../../packages/components'),
            '@md/styles': path.join(process.cwd(), '../../packages/styles'),
            '@md/api': path.join(process.cwd(), '../../packages/api'),
            '@md/utils': path.join(process.cwd(), '../../packages/utils'),
            '@md/sections': path.join(process.cwd(), '../../packages/sections'),
            '@': process.cwd(),
            // Map @_app_original to the actual generated _app file to satisfy the import in _app.tsx
            '@_app_original': path.join(process.cwd(), '.keystone/admin/pages/_app_original'),
        };
        return config;
    },
    experimental: {
        externalDir: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    transpilePackages: ['@md/components', '@md/styles', '@md/api', '@md/utils', '@md/types', '@md/sections', '@md/eslint', '@md/tsconfig'],
};

export default config;
