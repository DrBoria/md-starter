const path = require('path');

// When Keystone builds, this file runs from .keystone/admin/
// __dirname will be .keystone/admin/, so we go up 2 levels to reach project root
const projectRoot = path.resolve(__dirname, '../..');

const nextConfig = {
    // Experimental ESM Externals - required for Keystone
    experimental: { esmExternals: 'loose' },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    // We use transpilePackages for the custom admin-ui pages in the ./admin folder
    transpilePackages: [
        '../../admin',
        '@md/components',
        '@md/styles', 
        '@md/api', 
        '@md/utils', 
        '@md/types', 
        '@md/sections', 
        '@md/eslint', 
        '@md/tsconfig'
    ],
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@md/components': path.join(projectRoot, '../../packages/components'),
            '@md/styles': path.join(projectRoot, '../../packages/styles'),
            '@md/api': path.join(projectRoot, '../../packages/api'),
            '@md/utils': path.join(projectRoot, '../../packages/utils'),
            '@md/sections': path.join(projectRoot, '../../packages/sections'),
            '@': projectRoot,
            '@_app_original': path.join(__dirname, 'pages/_app.js'),
        };
        return config;
    },
};

module.exports = nextConfig;
