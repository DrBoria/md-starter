
module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["@md/components/*/*/*"],
                message: "Deep imports are not allowed. Please import from the second level directory (e.g. @md/components/default/overlays).",
              },
            ],
          },
        ],
      },
    },
  ],
};
