import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../../language/LanguageProvider";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { fetcher } from "../../../api/api";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "../urls";
import { formatToReadableDate, hasUtbetalinger, summerYtelser } from "../utils";
import UtbetalingContainer from "../container/UtbetalingContainer";
import UtbetalingYtelser from "../ytelser/UtbetalingYtelser";
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

  const sisteUtbetaling = utbetalinger.utbetalteUtbetalinger[0];
  const sisteUtbetalingSummert = summerYtelser(sisteUtbetaling.underytelser, sisteUtbetaling.trekk);

  const sisteUtbetalingDato = formatToReadableDate(utbetalinger.utbetalteUtbetalinger[0].ytelse_dato);
  const sisteUtbetalingKonto = utbetalinger.utbetalteUtbetalinger[0].kontonummer;

  return (
    <>
      <UtbetalingContainer type="siste">
        <div className={styles["utbetaling-heading"]}>
          <BodyShort>
            {text.tittel[language]}
          </BodyShort>
          <BodyShort>
            <a className={styles["utbetaling-link"]} href={utbetalingsoversiktUrl}>
              {text.alle[language]}
            </a>
          </BodyShort>
        </div>
        <Heading size="large">
          {sisteUtbetalingSummert + " kr"}
        </Heading>
        <BodyLong>
          {sisteUtbetalingDato} {text.konto[language]} {sisteUtbetalingKonto}
        </BodyLong>
      </UtbetalingContainer>
      <UtbetalingYtelser ytelse={sisteUtbetaling.ytelse} utbetaling={sisteUtbetalingSummert}/>
    </>
  );
};

export default Utbetaling;
