const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const _import = require("eslint-plugin-import");
const pluginSecurity = require("eslint-plugin-security");
const path = require("node:path");

// In CommonJS, __dirname is already available, so no need to import fileURLToPath or define __filename
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = [
  {
    // Ignored files and directories
    ignores: [
      "**/hubspot/**/*.js",
      "**/*.config.js",
      "**/*.config.cjs",
      "**/.eslintrc.cjs",
      "**/.next",
      "**/.keystone",
      "**/dist",
      "**/yanm-lock.yaml",
    ],
  },
  // Extend recommended configurations
  ...compat
    .extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended-type-checked",
      "plugin:anti-trojan-source/recommended",
      "plugin:@typescript-eslint/stylistic-type-checked"
    )
    .map((config) => ({
      ...config,
      files: ["**/*.ts", "**/*.tsx"],
    })),
  pluginSecurity.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescriptEslint,
      import: _import,
    },
    linterOptions: {
      reportUnusedDisableDirectives: false,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        project: true, // Enable type checking via tsconfig
      },
    },
    rules: {
      "security/detect-object-injection": "off",
      "no-constant-condition": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: false,
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
          "ts-check": false,
          minimumDescriptionLength: 3,
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../*"],
              message: "Relative imports from parent directories are forbidden. Please use absolute imports (e.g. @md/...) or sibling imports (./)."
            }
          ]
        }
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "TSAsExpression[typeAnnotation.type='TSTypeReference'][typeAnnotation.typeName.name='unknown']",
          message: "Do not use `as unknown`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/eslint-disable/]",
            message: "Do not use `eslint-disable`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/eslint-disable-next-line/]",
            message: "Do not use `eslint-disable-next-line`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/eslint-disable-line/]",
            message: "Do not use `eslint-disable-line`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/ts-ignore/]",
            message: "Do not use `ts-ignore`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/ts-nocheck/]",
            message: "Do not use `ts-nocheck`. It is strictly forbidden."
        },
        {
            selector: "Program > Comments[value=/ts-check/]",
            message: "Do not use `ts-check`. It is strictly forbidden."
        },
         {
            selector: "Program > Comments[value=/ts-expect-error/]",
            message: "Do not use `ts-expect-error`. It is strictly forbidden."
        }
      ],
    },
  },
];
