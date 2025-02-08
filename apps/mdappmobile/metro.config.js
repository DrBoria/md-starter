const path = require('path');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');


const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

// Tell Metro where to look for dependencies and watch folders
const extraNodeModules = new Proxy(
  {
    '@md/utils': path.resolve(__dirname, '../../packages/utils'),
    '@md/styles': path.resolve(__dirname, '../../packages/styles'), 
    '@md/native': path.resolve(__dirname, '../../packages/native'),
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
  path.resolve(__dirname, '../../'),
];

// Define the new resolver configuration
const config = {
  transformer: {
    babelTransformerPath: require.resolve(
      "react-native-svg-transformer/react-native"
    )
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    extraNodeModules,
  },
  watchFolders,
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
