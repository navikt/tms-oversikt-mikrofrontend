import { useContext } from "react";
import { BodyShort } from "@navikt/ds-react";
import { text } from "../text";
import { utbetalingsoversiktUrl } from "../urls";
import { LanguageContext } from "../../../language/LanguageProvider";
import styles from "./UtbetalingHeading.module.css";

const UtbetalingHeading = () => {
  const language = useContext(LanguageContext);

  return (
    <div className={styles.heading}>
      <BodyShort>
        {text.tittel[language]}
      </BodyShort>
      <a className={styles.link} href={utbetalingsoversiktUrl}>
        {text.alle[language]}
      </a>
    </div>
  );
}

export default UtbetalingHeading;
