import tsParser from "@typescript-eslint/parser";
// import { parser } from "eslint-mdx";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

// const mdxFiles = ["**/*.mdx"];
const scriptFiles = ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs"];

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,

  eslintPluginPrettierRecommended,
  // {
  //   files: mdxFiles,

  //   languageOptions: {
  //     globals: {
  //       CH: "readonly",
  //     },

  //     parser,
  //   },
  // },
  {
    files: scriptFiles,

    plugins: {
      //   "@typescript-eslint": typescriptEslint,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@next/next": nextPlugin,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "off",
      "no-unused-vars": "off",
      "no-undef": "off", // Handled by TypeScript

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
  globalIgnores([
    "**/node_modules",
    "**/.next",
    "**/out",
    "**/vitest.config.ts",
    "**/next-sitemap.config.js",
  ]),
]);
