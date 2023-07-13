import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { mineSakerSakstemaerUrl } from "../../api/urls";
import { server } from "../../mocks/server";
import DinOversikt from "./DinOversikt";

test("vis alle produktkort", async () => {
  render(
    //reset swr-cachen
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>
  );

  expect(await screen.findAllByRole("heading")).toHaveLength(8); //Overskrift + 7 produktkort
});

test("SYK og SYM er samme produkt", async () => {
  server.use(
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([{ kode: "SYK" }, { kode: "SYM" }]));
    })
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>
  );

  await waitFor(() => {
    expect(screen.getAllByRole("heading")).toHaveLength(2); //Overskrift + 1 produktkort
  });
});
