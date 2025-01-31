/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@common": path.resolve(__dirname, "./src/common"),
      "@modules": path.resolve(__dirname, "./src/modules"),
    },
  },
  // @ts-expect-error - Vite doesn't have a type for this yet
  test: {
    globals: true,
    environment: "happy-dom",
  },
});
