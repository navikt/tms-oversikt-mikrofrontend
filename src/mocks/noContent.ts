import { rest } from "msw";
import { featureToggleUrl, meldekortUrl, microfrontendsUrl, mineSakerSakstemaerUrl, oppfolgingUrl } from "../api/urls";
import { utbetalingsoversiktApiUrl } from "../components/utbetaling/utbetalingUrls";
import { mikrofrontendBundle } from "./mikrofrontendBundle";

const sakerHandler = () => {
  return [
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
  ...utbetalingHandler(),
  ...featureToggleHandler(),
  ...oppfolgingHandler(),
];
