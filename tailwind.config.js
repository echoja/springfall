/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
// const colors = require("tailwindcss/colors");
// tailwind.config.js
import { nextui } from "@nextui-org/theme";
import colors from "tailwindcss/colors";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,md,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
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
  plugins: [
    nextui({
      layout: {
        radius: {
          large: "1rem",
          medium: "0.5rem",
          small: "0.25rem",
        },
      },
    }),
  ],
};
