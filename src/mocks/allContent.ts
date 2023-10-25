import { rest } from "msw";
import {
  featureToggleUrl,
  meldekortApiUrl,
  meldekortUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../api/urls";
import { utbetalingsoversiktApiUrl } from "../components/utbetaling/utbetalingUrls";
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
              id: "1233",
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
              id: "167",
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
              id: "987",
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
              id: "08123a",
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
              id: "1235",
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
        }),
      );
    }),
  ];
};

export const featureToggleHandler = () => {
  return [
    rest.get(featureToggleUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ FlytteMeldekort: true }));
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

export const handlersAllContent = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...microfrontendBundleHandler(),
  ...utbetalingHandler(),
  ...featureToggleHandler(),
  ...oppfolgingHandler(),
  ...meldekortHandler(),
];
