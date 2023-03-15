
import React, { useState, useEffect, createContext } from "react";

export type Language = "nb" | "en";

const defualtLanguage = (sessionStorage.getItem("language") ?? "nb") as Language;
export const LanguageContext = createContext(defualtLanguage);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState(defualtLanguage);

  useEffect(() => {
    console.log("render -");
    window.addEventListener("storage", () => {
      setLanguage((sessionStorage.getItem("language") ?? "nb") as Language);
    });
  }, [language]);

  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
};

export default LanguageProvider;