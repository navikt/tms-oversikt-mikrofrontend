import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import { axe } from "vitest-axe";
import { antallVarslerUrl } from "../../api/urls";
import { server } from "../../mocks/server";
import Innboks from "./Innboks";

test("vis at det har kommet nye meldinger", async () => {
  server.use(
    rest.get(antallVarslerUrl, (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          innbokser: 4,
        })
      );
    })
  );

  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <Innboks />
    </SWRConfig>
  );

  expect(await screen.findByText("4 nye meldinger")).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});
