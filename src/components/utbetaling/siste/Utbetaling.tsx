import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../../language/LanguageProvider";
import { BodyLong, BodyShort, Heading, Link } from "@navikt/ds-react";
import { fetcher } from "../../../api/api";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "../urls";
import { formatToReadableDate, hasUtbetalinger, summerYtelser } from "../utils";
import { text } from "../text"
import styles from "./Utbetaling.module.css";

const Utbetaling = () => {
  const language = useContext(LanguageContext);
  const { data: utbetalinger, isLoading} = useSWRImmutable(utbetalingsoversiktApiUrl, fetcher);

  if (isLoading) {
    return null;
  }

  if (!hasUtbetalinger(utbetalinger.utbetalteUtbetalinger)) {
    return null;
  }

  const sisteUtbetaling = summerYtelser(
    utbetalinger.utbetalteUtbetalinger[0].underytelser,
    utbetalinger.utbetalteUtbetalinger[0].trekk
  );

  const sisteUtbetalingDato = formatToReadableDate(utbetalinger.utbetalteUtbetalinger[0].ytelse_dato);
  const sisteUtbetalingKonto = utbetalinger.utbetalteUtbetalinger[0].kontonummer;

  return (
    <>
      <div className={styles["utbetaling-container"]}>
        <div className={styles["utbetaling"]}>
          <div className={styles["utbetaling-heading"]}>
            <BodyShort>
              {text.tittel[language]}
            </BodyShort>
            <Link href={utbetalingsoversiktUrl}>
              {text.alle[language]}
            </Link>
          </div>
          <Heading size="large">
            {sisteUtbetaling + " kr"}
          </Heading>
          <BodyLong>
            {sisteUtbetalingDato} {text.konto[language]} {sisteUtbetalingKonto}
          </BodyLong>
        </div>
      </div>
    </>
  );
};

export default Utbetaling;
