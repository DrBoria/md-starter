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
          "1rem",
          "50%",
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
          "/^calc\\((?:(?!\\d+(?:px|em|rem|%|vw|vh|vmin|vmax)).)*\\)$/",
          "/fr$/",
          "100vh",
          "100vw",
          "50vh",
          "50vw",
          "/^(?!.*(\\d+(px|em|rem|%|vw|vh)|#|['\"])).*$/",
          "/^-?\\d+(\\.5)?$/",
          "1"
        ],
        ignoreVariables: false,
        ignoreFunctions: false,
        expandShorthand: true,
        disableFix: true,
        message: "Use theme variables or allowed exceptions (0, 1px, 100%, ${({ theme }) => theme....ETC})"
      }
    ],
    "function-disallowed-list": ["rgb", "rgba", "hsl", "hsla", "hwb", "lab", "lch"],
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
    ],
    "media-query-no-invalid": null,
    "comment-pattern": [
      "^((?!stylelint-disable)[\\s\\S])*$",
      {
        "message": "stylelint-disable comments are not allowed."
      }
    ]
  },
  overrides: [
    {
      files: [
        "**/*.{js,jsx,ts,tsx}"
      ],
    },
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
