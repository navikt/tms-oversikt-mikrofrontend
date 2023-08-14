import { rest } from "msw";
import {
  aapBaseCdnUrl,
  aapManifestUrl,
  aiaBaseCdnUrl,
  aiaManifestUrl,
  antallUtkastUrl,
  antallVarslerUrl,
  arbeidssokerUrl,
  digisosAntallUtkastUrl,
  identUrl,
  meldekortUrl,
  mineSakerApiUrl,
  mineSakerSakstemaerUrl,
  navnUrl,
  registrertArbeidssokerBaseCdnUrl,
  registrertArbeidssokerManifestUrl,
  selectorUrl,
  syfoDialogCdnUrl,
  syfoDialogManifestUrl,
} from "../api/urls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";

export const sakerHandler = () => {
  return [
    rest.get(mineSakerApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [
            {
              navn: "Serviceklager",
              kode: "SER",
              sistEndret: "2023-05-25T12:41:02Z",
              detaljvisningUrl: "https://www.intern.dev.nav.no/mine-saker/tema/SER",
            },
            {
              navn: "Arbeidsavklaringspenger",
              kode: "AAP",
              sistEndret: "2023-04-20T11:33:51Z",
              detaljvisningUrl: "https://aap-innsyn.dev.nav.no/aap/mine-aap",
            },
          ],
          sakerURL: "https://www.dev.intern.nav.no/mine-saker",
          dagpengerSistEndret: null,
        })
      );
    }),
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
        ])
      );
    }),
  ];
};

export const utkastHandler = () => {
  return [
    rest.get(antallUtkastUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          antall: 2,
        })
      );
    }),
    rest.get(digisosAntallUtkastUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          antall: 3,
        })
      );
    }),
  ];
};

export const varselHandler = () => {
  return [
    rest.get(antallVarslerUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          oppgaver: 3,
          beskjeder: 2,
          innbokser: 4,
        })
      );
    }),
  ];
};

export const microfrontendSelectorHandler = () => {
  return [
    rest.get(selectorUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ microfrontends: ["aap", "syfo-dialog"] }));
    }),
  ];
};

export const personaliahandler = () => {
  return [
    rest.get(navnUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          navn: "Navn navnesen",
        })
      );
    }),
    rest.get(identUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          navn: "123",
        })
      );
    }),
  ];
};

export const microfrontendsHandler = () => {
  return [
    rest.get(`${aiaBaseCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("AiA", "50vh"))
      );
    }),
    rest.get(`${registrertArbeidssokerBaseCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Registrert arbeidssøker", "5vh"))
      );
    }),
    rest.get(`${aapBaseCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("AAP", "5vh"))
      );
    }),
    rest.get(`${syfoDialogCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Syfo dialog", "5vh"))
      );
    }),
    rest.get(meldekortUrl, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Meldekort", "5vh"))
      );
    }),
  ];
};

export const manifestsHandler = () => {
  return [
    rest.get(aiaManifestUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          "src/main.tsx": {
            file: "bundle.js",
            src: "src/main.tsx",
            isEntry: true,
            css: ["assets/bundle.4ce1efd6.css"],
          },
        })
      );
    }),
    rest.get(registrertArbeidssokerManifestUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          "src/Mikrofrontend.tsx": {
            file: "bundle.js",
            src: "src/Mikrofrontend.tsx",
            isEntry: true,
            css: ["assets/bundle.4ce1efd6.css"],
          },
        })
      );
    }),
    rest.get(aapManifestUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          "src/Mikrofrontend.tsx": {
            file: "bundle.js",
            src: "src/Mikrofrontend.tsx",
            isEntry: true,
            css: ["assets/bundle.4ce1efd6.css"],
          },
        })
      );
    }),
    rest.get(syfoDialogManifestUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          "src/Mikrofrontend.tsx": {
            file: "bundle.js",
            src: "src/Mikrofrontend.tsx",
            isEntry: true,
            css: ["assets/bundle.4ce1efd6.css"],
          },
        })
      );
    }),
  ];
};

export const arbeidssøkerHandler = () => {
  return [
    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: true }));
    }),
  ];
};

export const handlers = [
  ...sakerHandler(),
  ...utkastHandler(),
  ...varselHandler(),
  ...microfrontendSelectorHandler(),
  ...personaliahandler(),
  ...microfrontendsHandler(),
  ...manifestsHandler(),
  ...arbeidssøkerHandler(),
];
