import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import postcssNesting from "postcss-nesting";

export default defineConfig(({ command }) => ({
  plugins: [react()],

  base: command === "build" ? "/jamit-app" : "/",

  css: {
    modules: {
      localsConvention: "camelCase",
    },
    postcss: {
      plugins: [postcssNesting],
    },
  },
}));
