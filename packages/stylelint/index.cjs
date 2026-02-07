module.exports = {
  extends: [
    "stylelint-config-standard"
  ],
  customSyntax: "postcss-styled-syntax",
  plugins: [
    "stylelint-order",
    "stylelint-declaration-strict-value"
  ],
  rules: {
    "scale-unlimited/declaration-strict-value": [
      [
        "/color/",
        "fill",
        "stroke",
        "/^margin/",
        "/^padding/",
        "gap",
        "/^border/",
        "/^background/",
        "font-size",
        "line-height",
        "letter-spacing",
        "width",
        "height",
        "/^min-/",
        "/^max-/",
        "top",
        "left",
        "right",
        "bottom",
        "box-shadow",
        "text-shadow",
        "z-index",
        "flex-basis",
        "border-radius",
        "opacity"
      ],
      {
        ignoreValues: [
          "0",
          "1px",
          "100%",
          "auto",
          "none",
          "transparent",
          "currentColor",
          "inherit",
          "initial",
          "unset",
          "solid",
          "dashed",
          "dotted",
          "collapse",
          "separate",
          "visible",
          "hidden",
          "scroll",
          "cover",
          "contain",
          "no-repeat",
          "repeat",
          "center",
          "row",
          "column",
          "flex-start",
          "flex-end",
          "baseline",
          "stretch",
          "/^calc/",
          "/fr$/"
        ],
        expandShorthand: true,
        message: "Use theme variables or allowed exceptions (0, 1px, 100%)"
      }
    ],
    "color-no-hex": true,
    "color-named": "never",
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": [
          "/^\\$/"
        ]
      }
    ],
    "selector-type-no-unknown": [
      true,
      {
        "ignoreTypes": [
          "/^\\$/"
        ]
      }
    ]
  },
  overrides: [
    {
      files: [
        "**/*.{js,jsx,ts,tsx}"
      ],
      customSyntax: "postcss-styled-syntax"
    },
    {
      files: [
        "packages/styles/**/*",
        "**/*theme*.ts",
        "**/*Theme*.ts",
        "**/themes/**/*.{ts,tsx}"
      ],
      rules: {
        "scale-unlimited/declaration-strict-value": null,
        "color-no-hex": null,
        "color-named": null
      }
    },
    {
      files: [
        "apps/_template-native/**/*.{ts,tsx}"
      ],
      rules: {
        "scale-unlimited/declaration-strict-value": null
      }
    },
    {
      files: [
        "packages/components/**/*.{ts,tsx}"
      ],
      rules: {
        "scale-unlimited/declaration-strict-value": null
      }
    },
    {
      files: [
        "packages/sections/**/*.{ts,tsx}"
      ],
      rules: {
        "scale-unlimited/declaration-strict-value": null,
        "color-no-hex": null,
        "color-named": null,
        "no-duplicate-selectors": null
      }
    }
  ],
  ignoreFiles: [
    "dist/**/*",
    "coverage/**/*",
    "node_modules/**/*",
    "**/*.d.ts",
    "packages/styles/themes/**/*",
    ".next/**/*",
    ".turbo/**/*"
  ]
};
