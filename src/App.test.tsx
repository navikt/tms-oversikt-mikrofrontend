import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import App from "./App";
import { arbeidssokerUrl, mineSakerApiUrl, mineSakerSakstemaerUrl, oppfolgingUrl, selectorUrl } from "./api/urls";
import { server } from "./mocks/server";
import { utbetalingsoversiktApiUrl } from "./components/utbetaling/utbetalingUrls";

test("side uten personalisert innhold fungerer", async () => {
  server.use(
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([]));
    }),

    rest.get(mineSakerApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [],
        })
      );
    }),

    rest.get(selectorUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ microfrontends: [] }));
    }),

    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: false }));
    }),

    rest.get(oppfolgingUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ underOppfolging: false }));
    }),

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
    })
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <App />
    </SWRConfig>
  );

  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Siste utbetaling", level: 2 })).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Innboks", level: 2 })).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(screen.getByRole("heading", { name: "Dokumentarkiv", level: 2 })).toBeInTheDocument();
  });
});
