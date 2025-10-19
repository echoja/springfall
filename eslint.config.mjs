import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { parser } from "eslint-mdx";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig, globalIgnores } from "eslint/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    "**/node_modules",
    "**/.next",
    "**/out",
    "**/vitest.config.ts",
    "**/next-sitemap.config.js",
  ]),
  {
    files: ["**/*.mdx"],
    extends: compat.extends("plugin:mdx/recommended", "prettier"),

    languageOptions: {
      globals: {
        CH: "readonly",
      },

      parser,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs"],

    extends: compat.extends(
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "next/core-web-vitals",
    ),

    plugins: {
      "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },

    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "off",

      "jsx-a11y/label-has-associated-control": [
        2,
        {
          controlComponents: ["input", "select", "textarea"],
          depth: 3,
        },
      ],

      "object-shorthand": "error",
      "no-useless-rename": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],

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

      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
        },
      ],
    },
  },
  eslintPluginPrettierRecommended,
]);
