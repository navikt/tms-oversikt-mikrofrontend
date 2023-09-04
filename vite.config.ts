import react from "@vitejs/plugin-react";
import { rollupImportMapPlugin } from "rollup-plugin-import-map";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { terser } from "rollup-plugin-terser";
const reactUrl = "https://www.nav.no/tms-min-side-assets/react/18/esm/index.js";
const reactDomUrl = "https://www.nav.no/tms-min-side-assets/react-dom/18/esm/index.js";

const imports = {
  react: reactUrl,
  "react-dom": reactDomUrl,
};

export default () => ({
  plugins: [
    react(),
    terser(),
    cssInjectedByJsPlugin(),
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
        "tms-oversikt-mikrofrontend": "src/Mikrofrontend.jsx",
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
    setupFiles: ["vitest-setup.ts"],
  },
  css: {
    modules: {
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
});
