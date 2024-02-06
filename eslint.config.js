/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
import path from "path";

import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: {},
});

/** @type {import("eslint").Linter.FlatConfig[]} */
const config = [
  {
    ignores: [
      "**/*.test-d.ts",
      ".next",
      "out",
      "node_modules",
      "vitest.config.ts",
    ],
  },
  {
    ...mdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
    rules: {
      //
      ...mdx.flat.rules,
    },
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
    },
  },
  ...compat
    .config({
      extends: [
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
      ],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./tsconfig.eslint.json",
        tsconfigRootDir: __dirname,
      },
      rules: {
        ...js.configs.recommended.rules,
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": [
          "error",
          { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
        ],

        "jsx-a11y/label-has-associated-control": [
          2,
          {
            // "labelComponents": ["CustomInputLabel"],
            // "labelAttributes": ["label"],
            controlComponents: [
              /* "CustomInput"*/ "input",
              "select",
              "textarea",
            ],
            depth: 3,
          },
        ],

        "object-shorthand": "error",

        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "interface",
            format: ["PascalCase"],
            custom: {
              regex: "^I[A-Z]",
              match: true,
            },
          },
        ],
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
          },
        ],

        "@typescript-eslint/switch-exhaustiveness-check": "error",

        "@next/next/no-img-element": "off",

        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "(useMyStoreMemo|useMyOtherCustomHook)",
          },
        ],

        "react/jsx-key": ["error", { checkFragmentShorthand: true }],
      },
    })
    .map((x) => ({
      ...x,
      files: ["**/*.{ts,tsx,js}"],
      ignores: ["**/*.{md,mdx}/*"],
    })),

  eslintConfigPrettier,
];

export default config;
