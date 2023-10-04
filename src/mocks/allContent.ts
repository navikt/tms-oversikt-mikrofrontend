import { rest } from "msw";
import {
  antallVarslerUrl,
  arbeidssokerBaseCdnUrl,
  featureToggleUrl,
  meldekortUrl,
  microfrontendsUrl,
  mineSakerApiSisteUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../api/urls";
import { utbetalingsoversiktApiUrl } from "../components/utbetaling/utbetalingUrls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";

export const sakerHandler = () => {
  return [
    rest.get(mineSakerApiSisteUrl, (_, res, ctx) => {
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
        })
      );
    }),
  ];
};

export const microfrontendBundleHandler = () => {
  return [
    rest.get(`${arbeidssokerBaseCdnUrl}/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Registrert arbeidssøker", "5vh"))
      );
    }),
    rest.get(`https://localhost:3000/aap/bundle.js`, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("AAP", "5vh"))
      );
    }),
    rest.get(`https://localhost:3000/syfo-dialog/bundle.js`, (_, res, ctx) => {
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
      return res(ctx.status(200), ctx.json({}));
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

export const oppfolgingHandler = () => {
  return [
    rest.get(oppfolgingUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ underOppfolging: true }));
    }),
  ];
};

export const handlersAllContent = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...microfrontendBundleHandler(),
  ...utbetalingHandler(),
  ...featureToggleHandler(),
  ...varselHandler(),
  ...oppfolgingHandler(),
];
