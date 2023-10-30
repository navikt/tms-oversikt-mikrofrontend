import { Heading } from "@navikt/ds-react";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test, vi } from "vitest";
import { axe } from "vitest-axe";
import {
  arbeidssokerUrl,
  meldekortApiUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../../api/urls";
import { sakerHandler } from "../../mocks/allContent";
import { server } from "../../mocks/server";
import DinOversikt from "./DinOversikt";

vi.mock("./MicrofrontendWrapper", function mockFactory() {
  return {
    default: () => {
      return <Heading size="medium">mf</Heading>;
    },
  };
});

vi.mock("../meldekort/MeldekortWrapper", function mockFactory() {
  return {
    default: () => {
      return <Heading size="medium">meldekort</Heading>;
    },
  };
});

vi.mock("../arbeidssoker/AiaStandardWrapper", function mockFactory() {
  return {
    default: () => {
      return <Heading size="medium">aia</Heading>;
    },
  };
});

test("vis alle produktkort", async () => {
  server.use(...sakerHandler());

  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findAllByRole("heading")).toHaveLength(8); //Overskrift + 7 produktkort
  expect(await axe(container)).toHaveNoViolations();
});

test("SYK og SYM er samme produkt", async () => {
  server.use(
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([{ kode: "SYK" }, { kode: "SYM" }]));
    }),
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findAllByRole("heading")).toHaveLength(2); //Overskrift + 1 produktkort
});

test("vis alle microfrontends", async () => {
  server.use(
    rest.get(microfrontendsUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          microfrontends: [
            {
              microfrontend_id: "mf1",
              url: "http://localhost:3000/mf1/bundle.js",
            },
            {
              microfrontend_id: "mf2",
              url: "http://localhost:3000/mf2/bundle.js",
            },
          ],
          offerStepup: false,
        }),
      );
    }),
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findAllByRole("heading", { name: "mf" })).toHaveLength(2);
});

test("vis dialog med veileder hvis under oppfølging", async () => {
  server.use(
    rest.get(oppfolgingUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ underOppfolging: true }));
    }),
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findByRole("heading", { level: 2, name: "Dialog med veilederen din" })).toBeInTheDocument();
});

test("vis meldekort", async () => {
  server.use(
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
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findByRole("heading", { name: "meldekort" })).toBeInTheDocument();
});

test("vis aia", async () => {
  server.use(
    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: true, erStandard: true }));
    }),
  );
  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>,
  );

  expect(await screen.findByRole("heading", { name: "aia" })).toBeInTheDocument();
});
