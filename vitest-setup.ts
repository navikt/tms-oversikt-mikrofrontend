import "vitest-axe/extend-expect";
import * as matchers from "vitest-axe/matchers";
import { afterAll, afterEach, beforeAll, expect } from "vitest";
import { server } from "./src/mocks/server";
import { cleanup, render } from "@testing-library/react";
expect.extend(matchers);

beforeAll(() => {
  server.listen({ onUnhandledRequest: "warn" });
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});

const customRender = (ui: any, options = {}) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  });

// override render export
export { customRender as render };