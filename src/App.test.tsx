import { render, screen } from "@testing-library/react";
import { SWRConfig } from "swr";
import { expect, test, vi } from "vitest";
import App from "./App";
import { axe } from "vitest-axe";

vi.mock("./components/aia/AiaWrapper", function mockFactory() {
  return {
    default: () => {
      return <h2>aia</h2>;
    },
  };
});

test("bruker uten personalisert innhold får alle generelle komponenter", async () => {
  const { container } = render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <App />
    </SWRConfig>
  );

  expect(await screen.findByRole("heading", { name: "Siste utbetaling", level: 2 })).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Innboks", level: 2 })).toBeInTheDocument();
  expect(await axe(container)).toHaveNoViolations();
});
