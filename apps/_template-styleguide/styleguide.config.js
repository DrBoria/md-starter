const { ProvidePlugin, DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require("path");
const fs = require("fs");

function getComponentPathPatterns(basePath) {
  if (!fs.existsSync(basePath)) {
    return null; // If folder doesn’t exist, return null
  }

  const components = fs
    .readdirSync(basePath)
    .filter((folder) => fs.existsSync(path.join(basePath, folder, "index.md")))
    .map((folder) => path.join(basePath, folder, "*.{tsx,ts}"));

  return components.length > 0 ? components : null;
}

const sections = [
  {
    name: "Theme Editor",
    components: getComponentPathPatterns(path.resolve(__dirname, "./components")),
  },
  {
    name: "@md/components",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/components/default")
    ),
  },
  {
    name: "@md/sections",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/sections/default") // Corrected to point to sections
    ),
  },
  {
    name: "@md/components/keystone",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/components/keystone")
    ),
  },
  {
    name: "@md/sections/keystone",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/sections/keystone")
    ),
  },
  {
    name: "@md/native/components",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/native/components")
    ),
  },
].filter((section) => section.components !== null);

module.exports = {
  styles: {
    StyleGuide: {
      "@global body": {
        fontFamily: "Helvetica",
      },
    },
    Playground: {
      preview: {
        position: "relative",
        transform: "translate3d(0, 0, 0)",
        outline: "1px solid #661",
      },
    },
  },
  tocMode: "collapse",
  moduleAliases: {
    components: path.resolve(__dirname, "../../packages/components"),
  },
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.stats = {
      warnings: false,
      errors: false,
    };
    // Removed HotModuleReplacementPlugin to avoid duplication
    return webpackConfig;
  },
  webpackConfig: {
    devtool: 'eval-source-map',
    devServer: {
      hot: true, // Enable HMR
      port: 6060,
      webSocketServer: 'ws',
      client: {
        overlay: false, // Disable error overlay
      },
      proxy: {
        "/api/graphql": {
          target: "http://localhost:3000",
          changeOrigin: true,
          pathRewrite: { "^/api/graphql": "/api/graphql" },
        },
      },
    },
    resolve: {
      alias: {
        "react-native$": "react-native-web",
        components: path.resolve(__dirname, "../../packages/components"),
      },
      modules: [
        path.resolve(__dirname, "../../node_modules"),
        path.resolve(__dirname, "node_modules"),
        "node_modules",
      ],
      extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
      fallback: {
        crypto: false,
        fs: false,
        zlib: require.resolve("browserify-zlib"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-react",
                "@babel/preset-env",
                "@babel/preset-flow",
                "@babel/preset-typescript",
              ],
              plugins: ["react-refresh/babel"],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3)$/,
          use: ["url-loader"],
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack", "url-loader"],
        },
      ],
    },
    plugins: [
      new ProvidePlugin({
        React: "react",
      }),
      new DefinePlugin({
        process: { env: {} },
      }),
      new HotModuleReplacementPlugin(), // Enable HMR
      new ReactRefreshWebpackPlugin(),  // Enable React Fast Refresh
    ],
  },
  sections,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "./Wrapper.tsx"),
  },
};
