import { rest } from "msw";
import {
  aiaCdnUrl,
  aiaManifestUrl,
  arbeidssokerUrl,
  featureToggleUrl,
  meldekortApiUrl,
  meldekortUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../api/urls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";

export const sakerHandler = () => {
  return [
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { kode: "DAG" },
          { kode: "FOR" },
          { kode: "HJE" },
          { kode: "KOM" },
          { kode: "PEN" },
          { kode: "SYK" },
          { kode: "SYM" },
          { kode: "UFO" },
          { kode: "UKJENT" },
        ]),
      );
    }),
  ];
};

export const microfrontendSelectorHandler = () => {
  return [
    rest.get(microfrontendsUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          microfrontends: [
            {
              microfrontend_id: "aap",
              url: `https://localhost:3000/aap/bundle.js`,
            },
            {
              microfrontend_id: "syfo-dialog",
              url: `https://localhost:3000/syfo-dialog/bundle.js`,
            },
          ],
          offerStepup: false,
        }),
      );
    }),
  ];
};

export const microfrontendBundleHandler = () => {
  return [
    rest.get(`${aiaCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("AiA", "30vh")),
      );
    }),
    rest.get(`https://localhost:3000/aap/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("AAP", "5vh")),
      );
    }),
    rest.get(`https://localhost:3000/syfo-dialog/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Syfo dialog", "5vh")),
      );
    }),
    rest.get(meldekortUrl, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Meldekort", "5vh")),
      );
    }),
  ];
};

export const manifestHandler = () => {
  return [
    rest.get(aiaManifestUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          "src/main-standard.tsx": {
            file: "bundle.js",
            src: "src/main.tsx",
            isEntry: true,
            css: ["assets/bundle.4ce1efd6.css"],
          },
        }),
      );
    }),
  ];
};

export const featureToggleHandler = () => {
  return [
    rest.get(featureToggleUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }),
  ];
};

export const oppfolgingHandler = () => {
  return [
    rest.get(oppfolgingUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ underOppfolging: true }));
    }),
  ];
};

export const meldekortHandler = () => {
  return [
    rest.get(meldekortApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          meldekort: 1,
          etterregistrerteMeldekort: 0,
          antallGjenstaaendeFeriedager: 0,
          nesteMeldekort: null,
          nesteInnsendingAvMeldekort: null,
        }),
      );
    }),
  ];
};

export const arbeidssokerHandler = () => {
  return [
    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: true, erStandard: true }));
    }),
  ];
};

export const handlersAllContent = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...microfrontendBundleHandler(),
  ...manifestHandler(),
  ...featureToggleHandler(),
  ...oppfolgingHandler(),
  ...meldekortHandler(),
  ...arbeidssokerHandler(),
];
