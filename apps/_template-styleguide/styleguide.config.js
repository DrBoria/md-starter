const { ProvidePlugin, DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require("path");
const fs = require("fs");

const isDevelopment = process.env.NODE_ENV === 'development';

function getComponentPathPatterns(basePath) {
  if (!fs.existsSync(basePath)) {
    return null; // If folder doesn’t exist, return null
  }

  const patterns = [];
  const folders = fs.readdirSync(basePath);

  folders.forEach((folder) => {
    const folderPath = path.join(basePath, folder);
    
    // Skip if not a directory
    if (!fs.lstatSync(folderPath).isDirectory()) {
      return;
    }

    const mdPath = path.join(folderPath, "index.md");

    if (fs.existsSync(mdPath)) {
      // Prioritize FolderName.tsx or FolderName.ts (Real component files)
      if (fs.existsSync(path.join(folderPath, `${folder}.tsx`))) {
        patterns.push(path.join(folderPath, `${folder}.tsx`));
      }
      else if (fs.existsSync(path.join(folderPath, `${folder}.ts`))) {
        patterns.push(path.join(folderPath, `${folder}.ts`));
      }
      // Then check for index.tsx
      else if (fs.existsSync(path.join(folderPath, "index.tsx"))) {
        patterns.push(path.join(folderPath, "index.tsx"));
      }
      // Finally index.ts
      else if (fs.existsSync(path.join(folderPath, "index.ts"))) {
        patterns.push(path.join(folderPath, "index.ts"));
      }
    }
  });

  return patterns.length > 0 ? patterns : null;
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
  getExampleFilename(componentPath) {
    return path.join(path.dirname(componentPath), 'index.md');
  },
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/types.ts',
    '**/styles.ts',
    '**/use*.tsx',
    '**/keystone/common/Icons/index.tsx',
  ],
  moduleAliases: {
    components: path.resolve(__dirname, "../../packages/components"),
  },
  context: {
    useState: 'react',
    useEffect: 'react',
    useMemo: 'react',
    useCallback: 'react',
  },
  tocMode: "collapse",
  dangerouslyUpdateWebpackConfig(webpackConfig) {
    webpackConfig.stats = 'errors-only'; // Show only errors
    webpackConfig.infrastructureLogging = {
      level: 'error', // Show only errors in infrastructure logs
    };
    webpackConfig.watchOptions = {
      ignored: /node_modules|(\.git)/,
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
        "@md/native": path.resolve(__dirname, "../../packages/native"),
        "@md/sections": path.resolve(__dirname, "../../packages/sections"),
        "@md/components": path.resolve(__dirname, "../../packages/components"),
        "@md/styles": path.resolve(__dirname, "../../packages/styles"),
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

          include: [
            path.resolve(__dirname),
            path.resolve(__dirname, "components"),
            path.resolve(__dirname, "../../packages/components"),
            path.resolve(__dirname, "../../packages/sections"),
            path.resolve(__dirname, "../../packages/native"),
            path.resolve(__dirname, "../../packages/utils"),
            path.resolve(__dirname, "../../packages/styles"),
            path.resolve(__dirname, "../../packages/api"),
            path.resolve(__dirname, "../../packages/types"),
          ],
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
              plugins: [
                isDevelopment && "react-refresh/babel"
              ].filter(Boolean),
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
      isDevelopment && new HotModuleReplacementPlugin(), // Enable HMR
      isDevelopment && new ReactRefreshWebpackPlugin(),  // Enable React Fast Refresh
    ].filter(Boolean),
  },
  sections,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "./Wrapper.tsx"),
  },
};
