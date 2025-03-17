import baseConfig from "./base.js";
import globals from "globals";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
];
