import { useContext } from "react";
import { jobb, hjelpemidler, personopplysning, annet } from "../components/innloggede-tjenester/Lenker";
import { LanguageContext } from "../language/LanguageProvider";
import { text } from "../language/text";

export function useTranslate(id: string) {
  const language = useContext(LanguageContext);
  return text[id][language];
}
