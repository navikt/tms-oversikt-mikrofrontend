import App from "./App";
import LanguageProvider from "./language/LanguageProvider";
import { initializeAmplitude } from "./amplitude";

const Mikrofrontend = () => {
  initializeAmplitude();

  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
};

export default Mikrofrontend;
