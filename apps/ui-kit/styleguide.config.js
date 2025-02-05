const { ProvidePlugin, DefinePlugin } = require("webpack");
const path = require("path");
const fs = require("fs");

function getComponentPathPatterns(basePath) {
  return fs
    .readdirSync(basePath)
    .filter((folder) => {
      const docPath = path.join(basePath, folder, "index.md");
      return fs.existsSync(docPath); // Leave just folders with index.md
    })
    .map((folder) => path.join(basePath, folder, "*.{tsx,ts}"));
}

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
  tocMode: 'collapse',
  moduleAliases: {
    components: path.resolve(__dirname, "../../packages/components"),
  },

  webpackConfig: {
    devServer: {
      proxy: {
        "/api/graphql": {
          target: "http://localhost:3000",
          changeOrigin: true,
          pathRewrite: {
            "^/api/graphql": "/api/graphql",
          },
        },
      },
    },
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
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [require("tailwindcss"), require("autoprefixer")],
                },
              },
            },
          ],
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

  // Add if you ned tailwind
  // require: [
  //   path.join(__dirname, "node_modules/tailwindcss/tailwind.css"),
  // ],

  sections: [
    {
      name: "Theme Editor",
      components: getComponentPathPatterns(
        path.resolve(__dirname, "./components")
      ),
    },
    {
      name: "Default Components",
      components: getComponentPathPatterns(
        path.resolve(__dirname, "../../packages/components/default")
      ),
    },
    {
      name: "Keystone Components",
      components: getComponentPathPatterns(
        path.resolve(__dirname, "../../packages/components/keystone")
      ),
    },
    {
      name: "Next Components",
      components: getComponentPathPatterns(
        path.resolve(__dirname, "../../packages/components/next")
      ),
    },
    {
      name: "React Native Components",
      components: "../../packages/native/components/[A-Z]*/*.+(tsx|ts)",
    },
  ],

  styleguideComponents: {
    Wrapper: path.join(
      __dirname,
      "../../packages/styles/ThemeProviderWrapper.tsx"
    ),
  },
};
