const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: [
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
        '"Iropke Batang"',
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
    extend: {
      colors: {
        brand: colors.emerald,
      }
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
