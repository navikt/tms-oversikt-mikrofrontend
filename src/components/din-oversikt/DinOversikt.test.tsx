import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { expect, test } from "vitest";
import { mineSakerSakstemaerUrl } from "../../api/urls";
import DinOversikt from "./DinOversikt";
import { server } from "../../mocks/server";
import { SWRConfig } from "swr";

test("SYK og SYM er samme produkt", async () => {
  server.use(
    rest.get(mineSakerSakstemaerUrl, (_, res, ctx) => {
      return res.once(ctx.status(200), ctx.json([{ kode: "SYK" }, { kode: "SYM" }]));
    })
  );

  //tom provider for å ikke cache kall
  const renderer = render(
    <SWRConfig value={{ provider: () => new Map() }}> 
      <DinOversikt />
    </SWRConfig>
  );
  await screen.findAllByRole("heading");
  expect(await screen.findAllByRole("heading")).toHaveLength(2); //Overskrift + 1 produktkort
});

test("vis alle produktkort", async () => {
  const renderer = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <DinOversikt />
    </SWRConfig>
  );
  await screen.findAllByRole("heading");
  expect(await screen.findAllByRole("heading")).toHaveLength(8); //Overskrift + 7 produktkort
});
