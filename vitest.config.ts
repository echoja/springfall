/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@modules": path.resolve(__dirname, "./src/modules"),
    },
  },
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
