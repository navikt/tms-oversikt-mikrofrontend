import { BodyShort } from "@navikt/ds-react";
import UtbetalingContainer from "../container/UtbetalingContainer";
import styles from "./UtbetalingYtelser.module.css";

interface Props {
  ytelse: string;
  utbetaling: number;
}

const UtbetalingYtelser = ({ ytelse, utbetaling }: Props) => {
  return (
    <UtbetalingContainer type="ytelser">
      <BodyShort className={styles.ytelse}>
        <span>{ytelse}</span>
        <span className={styles.sum}>{`${utbetaling} kr`}</span>
      </BodyShort>
    </UtbetalingContainer>
  );
};

export default UtbetalingYtelser;
