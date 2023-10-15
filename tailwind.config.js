/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
// const colors = require("tailwindcss/colors");
// tailwind.config.js
import { nextui } from "@nextui-org/react";
import colors from "tailwindcss/colors";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx,md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Pretendard Variable"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        serif: [
          "ui-serif",
          "Georgia",
          "Cambria",
          '"Times New Roman"',
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        brand: colors.emerald,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), nextui()],
};
