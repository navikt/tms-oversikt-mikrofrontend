import { useContext } from "react";
import { BodyShort } from "@navikt/ds-react";
import { text } from "../utbetalingText";
import { utbetalingsoversiktUrl } from "../utbetalingUrls";
import { LanguageContext } from "../../../language/LanguageProvider";
import { logNavigereEvent } from "../../../utils/amplitude";
import styles from "./UtbetalingHeading.module.css";

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
        className={styles.link}
        href={utbetalingsoversiktUrl}
        onClick={() => logNavigereEvent("utbetaling-widget", "generell", "Se alle")}
      >
        <BodyShort>{text.alle[language]}</BodyShort>
      </a>
    </div>
  );
};

export default UtbetalingHeading;
