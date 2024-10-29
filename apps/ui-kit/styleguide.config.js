const { ProvidePlugin, DefinePlugin } = require("webpack");
const path = require("path");

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

  moduleAliases: {
    components: path.resolve(__dirname, "../../packages/components"),
  },

 webpackConfig: {
    resolve: {
      alias: {
        "react-native$": "react-native-web",
        components: path.resolve(__dirname, "../../packages/components"),
      },
      modules: [
        path.resolve(__dirname, "../../node_modules"), // Root-level node_modules
        path.resolve(__dirname, "node_modules"), // Local node_modules in styleguidist
        "node_modules", // Fallback to default node_modules
      ],
      extensions: [".web.js", ".js", ".jsx", ".ts", ".tsx", ".json"],
      fallback: {
        crypto: false,
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
              presets: ["@babel/preset-react", "@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
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
    ],
  },

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
      name: "Next Components",
      components: "../../packages/components/next/*/*.+(tsx|ts)",
    },
    {
      name: "React Native Components",
      components: "../../packages/native-components/[A-Z]*/*.+(tsx|ts)",
    },
  ],

  styleguideComponents: {
    Wrapper: path.join(__dirname, '../../packages/styles/ThemeProviderWrapper.tsx'),
  },
};
