import { rest } from "msw";
import {
  aapBaseCdnUrl,
  aapManifestUrl,
  aiaBaseCdnUrl,
  aiaManifestUrl,
  antallVarslerUrl,
  arbeidssokerUrl,
  featureToggleUrl,
  meldekortUrl,
  mineSakerApiUrl,
  mineSakerSakstemaerUrl,
  registrertArbeidssokerBaseCdnUrl,
  registrertArbeidssokerManifestUrl,
  selectorUrl,
  syfoDialogCdnUrl,
  syfoDialogManifestUrl,
} from "../api/urls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";
import { utbetalingsoversiktApiUrl } from "../components/utbetaling/urls";

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

export const microfrontendSelectorHandler = () => {
  return [
    rest.get(selectorUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ microfrontends: ["aap", "syfo-dialog"] }));
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

export const utbetalingHandler = () => {
  return [
    rest.get(utbetalingsoversiktApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          bruker: {
            aktoerId: "12345",
            navn: "Ola Nordmann",
          },
          kommendeUtbetalinger: [],
          utbetalteUtbetalinger: [
            {
              ytelse: "Arbeidsavklaringspenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-09T22:46:01.204+02:00",
              forfall_dato: "2023-04-09T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-04-26T22:46:01.204+02:00",
                tom: "2023-05-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 6000.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann",
              },
              melding: "6 uker igjen av stønadsperioden",
            },
            {
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-05-12T22:46:01.204+02:00",
              forfall_dato: "2023-05-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-04-26T22:46:01.204+02:00",
                tom: "2023-05-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 1100.0,
                  antall: 7.0,
                  belop: 5700.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "32 uker igjen av stønadsperioden",
            },
            {
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
            {
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
            {
              ytelse: "Dagpenger",
              status: "Utbetalt",
              ytelse_dato: "2023-04-12T22:46:01.204+02:00",
              forfall_dato: "2023-04-12T22:46:01.204+02:00",
              ytelse_periode: {
                fom: "2023-03-26T22:46:01.204+01:00",
                tom: "2023-04-26T22:46:01.204+02:00",
              },
              utbetalt_til: "Ola Nordmann  ",
              kontonummer: "xx34567",
              underytelser: [
                {
                  beskrivelse: "Grunnsats",
                  sats: 100.0,
                  antall: 6.0,
                  belop: 600.0,
                },
                {
                  beskrivelse: "Testytelse",
                  sats: 200.0,
                  antall: 2.0,
                  belop: 400.0,
                },
                {
                  beskrivelse: "Tilleggspensjon",
                  sats: 100.0,
                  antall: 3.0,
                  belop: 300.0,
                },
              ],
              trekk: [
                {
                  trekk_type: "Skattetrekk",
                  trekk_belop: -350.0,
                },
              ],
              er_utbetalt: true,
              rettighetshaver: {
                aktoerId: "12345",
                navn: "Ola Nordmann      ",
              },
              melding: "60 uker igjen av stønadsperioden",
            },
          ],
        })
      );
    }),
  ];
};

export const featureToggleHandler = () => {
  return [
    rest.get(featureToggleUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ FlytteAia: true, NyInnboks: true }));
    }),
  ];
};

export const varselHandler = () => {
  return [
    rest.get(antallVarslerUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          innbokser: 4,
        })
      );
    }),
  ];
};

export const handlers = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...microfrontendsHandler(),
  ...manifestsHandler(),
  ...arbeidssøkerHandler(),
  ...utbetalingHandler(),
  ...featureToggleHandler(),
  ...varselHandler(),
];
