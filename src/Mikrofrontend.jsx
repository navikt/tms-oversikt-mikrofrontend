import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import "./App.css";
import LanguageProvider from "./utils/LanguageProvider";

const Mikrofrontend = () => {
  return (
    <LanguageProvider>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default Mikrofrontend;
