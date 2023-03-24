import React from "react";
import App from "./App";
import "./App.css";
import LanguageProvider from "./utils/LanguageProvider";

const Mikrofrontend = () => {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default Mikrofrontend;
