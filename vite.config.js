import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { terser } from "rollup-plugin-terser";
import { resolve } from "path";

const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl = "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

const imports = {
  react: reactUrl,
  "react-dom": reactDomUrl,
};

export default ({ command }) => ({
  plugins: [
    react(),
    terser(),
    cssInjectedByJsPlugin(),
    viteMockServe({
      mockPath: "mock",
      localEnabled: command === "serve",
    }),
    {
      ...rollupImportMapPlugin({ imports }),
      enforce: "pre",
      apply: "build",
    },
  ],
  build: {
    manifest: true,
    rollupOptions: {
      input: {
        "tms-oversikt-mikrofrontend": resolve(__dirname, "src/Mikrofrontend.jsx"),
      },
      preserveEntrySignatures: "exports-only",
      output: {
        entryFileNames: "[name].[hash].js",
        format: "esm",
      },
    },
  },
  test: {
    global: true,
    environment: "jsdom",
    deps: {
      inline: ["@testing-library/user-event"],
    },
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
