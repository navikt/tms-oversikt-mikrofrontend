import { rest } from "msw";
import {
  arbeidssokerUrl,
  featureToggleUrl,
  meldekortApiUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../api/urls";

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
        }),
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

export const meldekortHandler = () => {
  return [
    rest.get(meldekortApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          meldekort: 0,
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
      return res(ctx.status(200), ctx.json({ erArbeidssoker: false, erStandard: false }));
    }),
  ];
};

export const handlersNoContent = [
  ...sakerHandler(),
  ...microfrontendSelectorHandler(),
  ...featureToggleHandler(),
  ...oppfolgingHandler(),
  ...meldekortHandler(),
  ...arbeidssokerHandler(),
];
