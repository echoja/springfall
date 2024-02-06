import eslintConfigPrettier from "eslint-config-prettier";
import * as mdx from "eslint-plugin-mdx";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";

import { fileURLToPath } from "url";

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  resolvePluginsRelativeTo: __dirname,
  recommendedConfig: {},
});

console.log(
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended"],
    plugins: ["@typescript-eslint"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: "./tsconfig.eslint.json",
      tsconfigRootDir: __dirname,
    },
    ignorePatterns: [
      "node_modules",
      ".next",
      "out",
      "vitest.config.ts",
      "**/*.md",
      "**/*.mdx",
    ],
  }),
);

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
  js.configs.recommended,
  {
    ...mdx.flat,
    // optional, if you want to lint code blocks at the same
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
  },
  {
    ...mdx.flatCodeBlocks,
    rules: {
      ...mdx.flatCodeBlocks.rules,
    },
  },
  {
    // files: ["*.ts", "*.tsx"],
    // ...compat.extends("plugin:@typescript-eslint/recommended"),
    // plugins: { "@typescript-eslint": typescriptEslintPlugin },
    // languageOptions: {
    //   parserOptions: {
    //     project: "./tsconfig.eslint.json",
    //     tsconfigRootDir: __dirname,
    //   },
    //   parser: typescriptParser,
    // },
  },
  // ...compat.config({
  //   extends: ["plugin:@typescript-eslint/recommended"],
  //   plugins: ["@typescript-eslint"],
  //   parser: "@typescript-eslint/parser",
  //   parserOptions: {
  //     project: "./tsconfig.eslint.json",
  //     tsconfigRootDir: __dirname,
  //   },
  //   ignorePatterns: [
  //     "node_modules",
  //     ".next",
  //     "out",
  //     "vitest.config.ts",
  //     "**/*.md",
  //     "**/*.mdx",
  //   ],
  // }),

  // ...compat.config({
  //   plugins: ["@typescript-eslint"],
  //   extends: [
  //     "eslint:recommended",
  //     "plugin:@typescript-eslint/recommended",
  //     "next/core-web-vitals",
  //   ],
  //   parser: "@typescript-eslint/parser",
  //   parserOptions: {
  //     project: "./tsconfig.eslint.json",
  //   },
  //   ignorePatterns: [
  //     "node_modules",
  //     ".next",
  //     "out",
  //     "vitest.config.ts",
  //     "**/*.md",
  //     "**/*.mdx",
  //   ],
  //   rules: {
  //     "no-unused-vars": "off",
  //     "@typescript-eslint/no-unused-vars": [
  //       "error",
  //       { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
  //     ],

  //     "jsx-a11y/label-has-associated-control": [
  //       2,
  //       {
  //         // "labelComponents": ["CustomInputLabel"],
  //         // "labelAttributes": ["label"],
  //         controlComponents: [/* "CustomInput"*/ "input", "select", "textarea"],
  //         depth: 3,
  //       },
  //     ],

  //     "object-shorthand": "error",

  //     "@typescript-eslint/naming-convention": [
  //       "error",
  //       {
  //         selector: "interface",
  //         format: ["PascalCase"],
  //         custom: {
  //           regex: "^I[A-Z]",
  //           match: true,
  //         },
  //       },
  //     ],
  //     "@typescript-eslint/consistent-type-imports": [
  //       "error",
  //       {
  //         prefer: "type-imports",
  //       },
  //     ],

  //     "@typescript-eslint/switch-exhaustiveness-check": "error",

  //     "@next/next/no-img-element": "off",

  //     "react-hooks/exhaustive-deps": [
  //       "warn",
  //       {
  //         additionalHooks: "(useMyStoreMemo|useMyOtherCustomHook)",
  //       },
  //     ],

  //     "react/jsx-key": ["error", { checkFragmentShorthand: true }],
  //   },
  // }),

  eslintConfigPrettier,
];

export default config;
