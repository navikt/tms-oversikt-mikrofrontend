// eslint-disable-next-line no-undef
const aapManifest = require("./manifests/aapManifest.json");
// eslint-disable-next-line no-undef
const aiaManifest = require("./manifests/aiaManifest.json");

export default [
  {
    url: "/aia/manifest.json",
    method: "get",
    response: () => {
      return aiaManifest;
    },
  },
  {
    url: "/aap/manifest.json",
    method: "get",
    response: () => {
      return aapManifest;
    },
  },
  {
    url: "/meldekort/manifest.json",
    method: "get",
    response: () => {
      return {
        "src/Mikrofrontend.jsx": {
          file: "bundle.js",
          src: "src/Mikrofrontend.jsx",
          isEntry: true,
          css: ["assets/bundle.4ce1efd6.css"],
        },
      };
    },
  },
];
