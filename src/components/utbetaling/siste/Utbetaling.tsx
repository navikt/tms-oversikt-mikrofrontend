import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../../language/LanguageProvider";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { fetcher } from "../../../api/api";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "../urls";
import { formatToReadableDate, hasUtbetalinger, summerYtelser } from "../utils";
import UtbetalingContainer from "../container/UtbetalingContainer";
import UtbetalingYtelser from "../ytelser/UtbetalingYtelser";
import { UtbetalingResponse } from "../types";
import { text } from "../text"
import styles from "./Utbetaling.module.css";

const Utbetaling = () => {
  const language = useContext(LanguageContext);
  const { data, isLoading} = useSWRImmutable<UtbetalingResponse>(utbetalingsoversiktApiUrl, fetcher);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  if (!hasUtbetalinger(data.utbetalteUtbetalinger)) {
    return (
      <UtbetalingContainer type="ingen">
        <div className={styles.heading}>
          <BodyShort>
            {text.tittel[language]}
          </BodyShort>
          <a className={styles.link} href={utbetalingsoversiktUrl}>
            {text.alle[language]}
          </a>
        </div>
        <BodyShort>
          {text.ingen[language]}
        </BodyShort>
      </UtbetalingContainer>
    );
  }

  const sisteUtbetaling = data.utbetalteUtbetalinger[0];
  const sum = summerYtelser(sisteUtbetaling.underytelser, sisteUtbetaling.trekk);
  const dato = formatToReadableDate(sisteUtbetaling.ytelse_dato);
  const konto = sisteUtbetaling.kontonummer;

  return (
    <>
      <UtbetalingContainer type="siste">
        <div className={styles.heading}>
          <BodyShort>
            {text.tittel[language]}
          </BodyShort>
          <a className={styles.link} href={utbetalingsoversiktUrl}>
            {text.alle[language]}
          </a>
        </div>
        <Heading size="large">
          {sum + " kr"}
        </Heading>
        <BodyLong>
          {dato} {text.konto[language]} {konto}
        </BodyLong>
      </UtbetalingContainer>
      <UtbetalingYtelser ytelse={sisteUtbetaling.ytelse} utbetaling={sum}/>
    </>
  );
};

export default Utbetaling;
