import { BodyShort } from "@navikt/ds-react";
import styles from "./UtbetalingListe.module.css";

const UtbetalingListe = () => {
  return (
    <div className={styles["utbetaling-container"]}>
      <div className={styles["utbetaling-liste"]}>
        <BodyShort>
          <span className={styles["utbetaling-tema"]}>Foreldrepenger</span> 24 368 kr
        </BodyShort>
      </div>
    </div>
  );
};

export default UtbetalingListe;
