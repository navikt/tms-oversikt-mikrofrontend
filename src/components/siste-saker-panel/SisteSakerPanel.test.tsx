import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import { mineSakerApiUrl, mineSakerUrl } from "../../api/urls";
import { server } from "../../mocks/server";
import SisteSakerPanel from "./SisteSakerPanel";

test("tomt panel lenker til dokumentarkiv", async () => {
  server.use(
    rest.get(mineSakerApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [],
        })
      );
    })
  );

  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <SisteSakerPanel />
    </SWRConfig>
  );

  expect(await screen.findByRole("link")).toHaveAttribute("href", mineSakerUrl);
  expect(await axe(container)).toHaveNoViolations();
});

test("viser siste dokument", async () => {
  server.use(
    rest.get(mineSakerApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [
            {
              navn: "Serviceklager",
              kode: "SER",
              sistEndret: "2023-05-25T12:41:02Z",
              detaljvisningUrl: "https://localhost:3000/dokumenturl",
            },
          ],
        })
      );
    })
  );

  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <SisteSakerPanel />
    </SWRConfig>
  );

  expect(await screen.findByRole("heading", { name: "Serviceklager", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: /Serviceklager/ })).toHaveAttribute(
    "href",
    "https://localhost:3000/dokumenturl"
  );
  expect(await screen.findByText("Sist endret: 25. mai 2023")).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: "Se alle" })).toHaveAttribute("href", mineSakerUrl);
  expect(await axe(container)).toHaveNoViolations();
});

test("viser to siste dokumenter", async () => {
  server.use(
    rest.get(mineSakerApiUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sakstemaer: [
            {
              navn: "Serviceklager",
              kode: "SER",
              sistEndret: "2023-05-25T12:41:02Z",
              detaljvisningUrl: "https://localhost:3000/dokumenturl1",
            },
            {
              navn: "Arbeidsavklaringspenger",
              kode: "AAP",
              sistEndret: "2023-04-20T11:33:51Z",
              detaljvisningUrl: "https://localhost:3000/dokumenturl2",
            },
          ],
        })
      );
    })
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <SisteSakerPanel />
    </SWRConfig>
  );

  expect(await screen.findByRole("heading", { name: "Serviceklager", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Arbeidsavklaringspenger", level: 2 })).toBeInTheDocument();
});
