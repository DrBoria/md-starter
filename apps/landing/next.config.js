const { withPlugins } = require('next-compose-plugins');
const path = require('path');

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
const assetPrefix = process.env.NEXT_PUBLIC_ASSET_PREFIX;

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  reactStrictMode: true,
  basePath: basePath,
  assetPrefix: assetPrefix,
  compiler: {
    styledComponents: true
  },
  experimental: {
    esmExternals: 'loose'
  },
  images: {
    loader: 'custom',
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  transpilePackages: [
    '@md/styles',
    '@md/components',
    '@md/sections',
    '@md/api',
    'next-image-export-optimizer'
  ],
  webpack: (config) => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        '@md/styles': path.resolve(__dirname, '../../packages/styles'),
        'styled-components': path.resolve(__dirname, 'node_modules/styled-components')
      },
      modules: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, '../../packages/styles'),
        'node_modules'
      ]
    };
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx', '.mjs'],
      '.mjs': ['.mts', '.mjs', '.js']
    };

    // Специальное правило для next-image-export-optimizer
    config.module.rules.push({
      test: /next-image-export-optimizer/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false
      }
    });

    config.module.rules.push({
      test: /\.svg$/,
      issuer: { and: [/\.(js|ts)x?$/] },
      use: [{ loader: 'raw-loader' }],
    });

    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = withPlugins([], nextConfig);
