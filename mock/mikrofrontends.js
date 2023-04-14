import aia from "./bundle/aia";
import meldekort from "./bundle/meldekort";
import aap from "./bundle/aap";

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
];
