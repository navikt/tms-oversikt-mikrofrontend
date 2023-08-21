import { BodyShort } from "@navikt/ds-react";
import styles from "./UtbetalingYtelser.module.css";
import UtbetalingContainer from "../container/UtbetalingContainer";

const UtbetalingYtelser = () => {
  return (
    <UtbetalingContainer>
        <BodyShort>
          <span className={styles["utbetaling-tema"]}>Foreldrepenger</span> 24 368 kr
        </BodyShort>
    </UtbetalingContainer>
  );
};

export default UtbetalingYtelser;
