import { BodyShort } from "@navikt/ds-react";
import styles from "./UtbetalingYtelser.module.css";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { utbetalingsoversiktUrl } from "../utbetalingUrls";

interface Props {
  ytelse: string;
  utbetaling: number;
  id: string;
  isKommende: boolean;
}

const UtbetalingYtelser = ({ ytelse, utbetaling, isKommende, id }: Props) => {
  return (
    <div className={styles.wrapper}>
      <a
        href={`${utbetalingsoversiktUrl}/utbetaling/${id}`}
        className={`${styles.container} ${isKommende && styles.kommendeUtbetaling}`}
      >
        <div className={styles.ytelse}>
          <BodyShort>{ytelse}</BodyShort>
          <BodyShort weight="semibold" className={styles.ytelseSum}>{`${utbetaling.toLocaleString(
            "no-nb"
          )} kr`}</BodyShort>
        </div>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </a>
    </div>
  );
};

export default UtbetalingYtelser;
