import { BodyShort } from "@navikt/ds-react";
import styles from "./UtbetalingYtelser.module.css";
import UtbetalingContainer from "../container/UtbetalingContainer";

interface Props {
  ytelse: string;
  utbetaling: number;
}

const UtbetalingYtelser = ({ ytelse, utbetaling }: Props) => {
  return (
    <UtbetalingContainer type="ytelser">
        <BodyShort>
          <span className={styles["utbetaling-ytelse"]}>
            <span>{ytelse}</span>
            <span className={styles["utbetaling-sum"]}>{`${utbetaling} kr`}</span>
          </span>
        </BodyShort>
    </UtbetalingContainer>
  );
};

export default UtbetalingYtelser;
