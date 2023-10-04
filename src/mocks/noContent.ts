import { rest } from "msw";
import {
  antallVarslerUrl,
  arbeidssokerUrl,
  featureToggleUrl,
  meldekortUrl,
  microfrontendsUrl,
  mineSakerApiSisteUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../api/urls";
import { utbetalingsoversiktApiUrl } from "../components/utbetaling/utbetalingUrls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";

const sakerHandler = () => {
  return [
    rest.get(mineSakerApiSisteUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [],
        })
      );
    }),
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    }),
  ];
};

const microfrontendSelectorHandler = () => {
  return [
    rest.get(microfrontendsUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          microfrontends: [],
          offerStepup: false,
        })
      );
    }),
  ];
};

const microfrontendBundleHandler = () => {
  return [
    rest.get(meldekortUrl, (_, res, ctx) => {
      return res(
        ctx.set("Content-Type", "text/javascript"),
        ctx.status(200),
        ctx.body(mikrofrontendBundle("Meldekort", "5vh"))
      );
    }),
  ];
};

const arbeidssøkerHandler = () => {
  return [
    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: false }));
    }),
  ];
};

const utbetalingHandler = () => {
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
          utbetalteUtbetalinger: [],
        })
      );
    }),
  ];
};

const featureToggleHandler = () => {
  return [
    rest.get(featureToggleUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({}));
    }),
  ];
};

const varselHandler = () => {
  return [
    rest.get(antallVarslerUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          innbokser: 0,
        })
      );
    }),
  ];
};

const oppfolgingHandler = () => {
  return [
    rest.get(oppfolgingUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ underOppfolging: false }));
    }),
  ];
};

export const handlersNoContent = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...microfrontendBundleHandler(),
  ...arbeidssøkerHandler(),
  ...utbetalingHandler(),
  ...featureToggleHandler(),
  ...varselHandler(),
  ...oppfolgingHandler(),
];
