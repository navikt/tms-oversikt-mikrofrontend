import React from "react";
import { createRoot } from "react-dom/client";
import Mikrofrontend from "./Mikrofrontend";
import "./index.css";

const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }
  return "local";
};

const root = createRoot(document.getElementById("root"));

if (getEnvironment !== "production") {
  const msw = await import("./mocks/browser");
  await msw.worker.start({ onUnhandledRequest: "bypass" });
  msw.worker.printHandlers();
}

root.render(
  <React.StrictMode>
    <Mikrofrontend />
  </React.StrictMode>
);
