import { useContext } from "react";
import { BodyShort } from "@navikt/ds-react";
import { text } from "../text";
import { utbetalingsoversiktUrl } from "../urls";
import { LanguageContext } from "../../../language/LanguageProvider";
import styles from "./UtbetalingHeading.module.css";
import { logNavigereEvent } from "../../../utils/amplitude";

const UtbetalingHeading = () => {
  const language = useContext(LanguageContext);

  return (
    <div className={styles.heading}>
      <BodyShort>
        {text.tittel[language]}
      </BodyShort>
      <a
        className={styles.link} href={utbetalingsoversiktUrl}
        onClick={() => logNavigereEvent("utbetaling-widget", "generell", "Se alle")}
      >
        {text.alle[language]}
      </a>
    </div>
  );
}

export default UtbetalingHeading;
