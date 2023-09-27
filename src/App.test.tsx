import { render, screen, waitFor } from "@testing-library/react";
import { SWRConfig } from "swr";
import { expect, test } from "vitest";
import App from "./App";

test("side uten personalisert innhold fungerer", async () => {
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
