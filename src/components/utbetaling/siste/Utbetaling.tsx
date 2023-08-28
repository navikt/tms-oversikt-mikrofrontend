import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../../language/LanguageProvider";
import { BodyLong, BodyShort, Heading, LinkPanel } from "@navikt/ds-react";
import { fetcher } from "../../../api/api";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "../urls";
import { formatToReadableDate, hasUtbetalinger, summerYtelser } from "../utils";
import UtbetalingContainer from "../container/UtbetalingContainer";
import UtbetalingYtelser from "../ytelser/UtbetalingYtelser";
import UtbetalingHeading from "../heading/UtbetalingHeading";
import { UtbetalingResponse } from "../types";
import { Next } from "@navikt/ds-icons";
import { text } from "../text"
import style from "./Utbetaling.module.css";

const Utbetaling = () => {
  const { data, isLoading} = useSWRImmutable<UtbetalingResponse>(utbetalingsoversiktApiUrl, fetcher);
  const language = useContext(LanguageContext);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  if (!hasUtbetalinger(data.utbetalteUtbetalinger)) {
    return (
      <div className={style.ingen}>
        <div className={style.container}>
          <UtbetalingHeading type="ingen" />
          <LinkPanel as={() => (
            <a className={style.link} href={utbetalingsoversiktUrl}>
              {text.ingen[language]}
              <Next className={style.chevron} />
            </a>
          )} border={false} href={utbetalingsoversiktUrl} className={style.link}>
            <BodyShort>{text.ingen[language]}</BodyShort>
          </LinkPanel>
        </div>
      </div>
    );
  }

  const sisteUtbetaling = data.utbetalteUtbetalinger[0];
  const sum = summerYtelser(sisteUtbetaling.underytelser, sisteUtbetaling.trekk);
  const dato = formatToReadableDate(sisteUtbetaling.ytelse_dato);
  const konto = sisteUtbetaling.kontonummer;

  return (
    <>
      <UtbetalingContainer type="siste">
        <UtbetalingHeading />
        <Heading size="large">
          {sum.toLocaleString("no-nb") + " kr"}
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
