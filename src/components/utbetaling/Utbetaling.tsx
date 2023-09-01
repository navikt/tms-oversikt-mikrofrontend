import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../language/LanguageProvider";
import { BodyLong, Heading } from "@navikt/ds-react";
import { fetcher } from "../../api/api";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "./utbetalingUrls";
import { formatToReadableDate, hasUtbetalinger, summerYtelser } from "./utbetalingUtils";
import UtbetalingContainer from "./container/UtbetalingContainer";
import UtbetalingYtelser from "./ytelser/UtbetalingYtelser";
import UtbetalingHeading from "./heading/UtbetalingHeading";
import { UtbetalingResponse } from "./utbetalingTypes";
import { logNavigereEvent } from "../../utils/amplitude";
import { text } from "./utbetalingText"
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
            <a
              className={style.link} href={utbetalingsoversiktUrl}
              onClick={() => logNavigereEvent("utbetaling-widget", "generell", "Du har ingen...")}
            >
              <BodyLong className={style.text}>{text.ingen[language]}</BodyLong> <ChevronRightIcon className={style.chevron} />
            </a>
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
