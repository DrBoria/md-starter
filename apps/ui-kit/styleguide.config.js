const { ProvidePlugin, DefinePlugin } = require("webpack");
const path = require("path");

module.exports = {
  // Fix to prevent element with "position: fixed" move out of the styleguidist preview box
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

  moduleAliases: {
    components: path.resolve(__dirname, "../../packages/components"),
  },
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
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
        React: "react", // automatically import react where needed
      }),
      new DefinePlugin({
        process: { env: {} },
      }),
    ],
    resolve: {
      fallback: {
        crypto: false,
      },
      extensions: [".js", "jsx", ".ts", ".tsx", ".json"],
    },
  },

  // Sections that is displayed in styleguidelist
  sections: [
    {
      name: "Default Components",
      components: "../../packages/components/default/*/*.+(tsx|ts)",
    },
    {
      name: "Keystone Components",
      components: "../../packages/components/keystone/*/*.+(tsx|ts)",
    },
    {
      name: "Material UI Components",
      components: "../../packages/components/material-ui/*/*.+(tsx|ts)",
    },
    {
      name: "Next Components",
      components: "../../packages/components/next/*/*.+(tsx|ts)",
    },
  ],

    // Theme provider
    styleguideComponents: {
      Wrapper: path.join(__dirname, '../../packages/styles/ThemeProviderWrapper.tsx'),
    },
};
