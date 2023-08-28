import { useContext } from "react";
import { BodyShort } from "@navikt/ds-react";
import { text } from "../text";
import { utbetalingsoversiktUrl } from "../urls";
import { LanguageContext } from "../../../language/LanguageProvider";
import styles from "./UtbetalingHeading.module.css";
import { logNavigereEvent } from "../../../utils/amplitude";

interface Props {
  type?: string;
}

const UtbetalingHeading = ({ type }: Props) => {
  const language = useContext(LanguageContext);

  if (type === "ingen") {
    return (
      <div className={styles.heading}>
        <BodyShort as="h2" spacing>
          {text.tittel[language]}
        </BodyShort>
      </div>
    );
  }

  return (
    <div className={styles.heading}>
      <BodyShort as="h2" spacing>
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
