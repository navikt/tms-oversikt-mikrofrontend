import { Alert } from "@navikt/ds-react";
import styles from "./Feilmelding.module.css";
import { useContext } from "react";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";

const FeilMelding = () => {
  const language = useContext(LanguageContext);

  return (
    <Alert variant="error" className={styles["feilmelding"]}>
      {text.feilmelding[language]}
    </Alert>
  );
};

export default FeilMelding;
