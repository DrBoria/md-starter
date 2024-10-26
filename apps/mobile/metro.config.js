const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Tell Metro where to look for dependencies and watch folders
const extraNodeModules = new Proxy(
  {
    '@md/utils': path.resolve(__dirname, '../../packages/utils'), // Add your alias here
    '@md/styles': path.resolve(__dirname, '../../packages/styles'), // Add your alias here
    '@md/native-components': path.resolve(__dirname, '../../packages/native-components'), // Add your alias here
  },
  {
    get: (target, name) =>
      path.join(__dirname, 'node_modules', name),
  },
);

const watchFolders = [
  // If you're in a monorepo
  path.resolve(__dirname, '../../node_modules'),
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../packages'),
];

const config = {
  resolver: {
    extraNodeModules,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
