import aia from "./bundle/aia";
import meldekort from "./bundle/meldekort";
import aap from "./bundle/aap";
import syfoDialog from "./bundle/syfoDialog";

export default [
  {
    url: "/aia/bundle.js",
    method: "get",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "text/javascript");
      res.statusCode = 200;
      res.end(aia);
    },
  },
  {
    url: "/meldekort/bundle.js",
    method: "get",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "text/javascript");
      res.statusCode = 200;
      res.end(meldekort);
    },
  },
  {
    url: "/aap/bundle.js",
    method: "get",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "text/javascript");
      res.statusCode = 200;
      res.end(aap);
    },
  },
  {
    url: "/syfo-dialog/bundle.js",
    method: "get",
    rawResponse: async (req, res) => {
      res.setHeader("Content-Type", "text/javascript");
      res.statusCode = 200;
      res.end(syfoDialog);
    },
  },
];
