import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test, vi } from "vitest";
import App from "./App";
import { arbeidssokerUrl } from "./api/urls";
import { server } from "./mocks/server";
import { axe } from "vitest-axe";

vi.mock("./components/aia/AiaWrapper", function mockFactory() {
  return {
    default: () => {
      return <h2>aia</h2>;
    },
  };
});

test("side uten personalisert innhold fungerer", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <App />
    </SWRConfig>
  );

  expect(await screen.findByRole("heading", { name: "Siste utbetaling", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Innboks", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Dokumentarkiv", level: 2 })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});

test("vis aia hvis registrert som arbeidssøker", async () => {
  server.use(
    rest.get(arbeidssokerUrl, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ erArbeidssoker: true }));
    })
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <App />
    </SWRConfig>
  );

  expect(await screen.findByRole("heading", { name: "aia" })).toBeInTheDocument();
});
