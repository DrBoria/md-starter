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
    sections: [
      {
        name: "Forms",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/forms")),
      },
      {
        name: "Navigation",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/navigation")),
      },
      {
        name: "Data Display",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/data-display")),
      },
      {
        name: "Feedback",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/feedback")),
      },
      {
        name: "Overlays",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/overlays")),
      },
      {
        name: "Layout",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/layout")),
      },
      {
        name: "Common",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/default/common")),
      },
    ],
  },
  {
    name: "@md/sections",
    sections: [
      {
        name: "Feedback",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/default/feedback")),
      },
      {
        name: "Navigation",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/default/navigation")),
      },
    ],
  },
  {
    name: "@md/components/keystone",
    sections: [
      {
        name: "Forms",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/forms")),
      },
      {
        name: "Navigation",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/navigation")),
      },
      {
        name: "Data Display",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/data-display")),
      },
      {
        name: "Feedback",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/feedback")),
      },
      {
        name: "Overlays",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/overlays")),
      },
      {
        name: "Common",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/components/keystone/common")),
      },
    ],
  },
  {
    name: "@md/sections/keystone",
    sections: [
      {
        name: "Forms",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/forms")),
      },
      {
        name: "Data Display",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/data-display")),
      },
      {
        name: "Feedback",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/feedback")),
      },
      {
        name: "Overlays",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/overlays")),
      },
      {
        name: "Layout",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/layout")),
      },
      {
        name: "Common",
        components: getComponentPathPatterns(path.resolve(__dirname, "../../packages/sections/keystone/common")),
      },
    ],
  },
  {
    name: "@md/native/components",
    components: getComponentPathPatterns(
      path.resolve(__dirname, "../../packages/native/components")
    ),
  },
].filter((section) => section.components !== null || (section.sections && section.sections.length > 0));

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
        "styled-components/native": "styled-components",
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
