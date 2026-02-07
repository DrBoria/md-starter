module.exports = {
  presets: [
    [
      "@babel/preset-env",
    ],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    ["babel-plugin-styled-components", { ssr: true }],
    process.env.NODE_ENV === 'development' && "react-refresh/babel",
  ].filter(Boolean),
};
""
