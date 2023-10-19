import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LanguageContext } from "../../language/LanguageProvider";
import { BodyLong, Heading } from "@navikt/ds-react";
import { fetcher } from "../../api/api";
import { ChevronRightIcon } from "@navikt/aksel-icons";
import { utbetalingsoversiktApiUrl, utbetalingsoversiktUrl } from "./utbetalingUrls";
import { formatToReadableDate, summerYtelser } from "./utbetalingUtils";
import UtbetalingYtelser from "./ytelser/UtbetalingYtelser";
import UtbetalingHeading from "./heading/UtbetalingHeading";
import { UtbetalingResponse } from "./utbetalingTypes";
import { logNavigereEvent } from "../../utils/amplitude";
import { text } from "./utbetalingText";
import style from "./Utbetaling.module.css";

const Utbetaling = () => {
  const { data, isLoading } = useSWRImmutable<UtbetalingResponse>(utbetalingsoversiktApiUrl, fetcher);
  const language = useContext(LanguageContext);

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }
  const hasKommendeUtbetaling = data.kommendeUtbetalinger.length > 0;
  const hasUtbetaltUtbetaling = data.utbetalteUtbetalinger.length > 0;

  if (!hasKommendeUtbetaling && !hasUtbetaltUtbetaling) {
    return (
      <div className={style.ingen}>
        <div className={style.container}>
          <UtbetalingHeading type="ingen" />
          <a
            className={style.link}
            href={utbetalingsoversiktUrl}
            onClick={() => logNavigereEvent("utbetaling-widget", "generell", "Du har ingen...")}
          >
            <BodyLong className={style.text}>{text.ingen[language]}</BodyLong>{" "}
            <ChevronRightIcon aria-hidden fontSize="24px" className={style.chevron} />
          </a>
        </div>
      </div>
    );
  }

  const utbetalingToShow = hasKommendeUtbetaling ? data.kommendeUtbetalinger[0] : data.utbetalteUtbetalinger[0];
  const sum = summerYtelser(utbetalingToShow.underytelser, utbetalingToShow.trekk);
  const dato = formatToReadableDate(utbetalingToShow.ytelse_dato);
  const konto = utbetalingToShow.kontonummer;

  return (
    <>
      <div className={style.detaljer}>
        <div className={`${style.detaljerContainer} ${hasKommendeUtbetaling && style.kommendeUtbetaling}`}>
          <UtbetalingHeading type={hasKommendeUtbetaling ? "neste" : "siste"} />
          <Heading size="large">{sum.toLocaleString("no-nb") + " kr"}</Heading>
          <BodyLong>
            {dato} {text.konto[language]} {konto}
          </BodyLong>
        </div>
      </div>
      <UtbetalingYtelser
        isKommende={hasKommendeUtbetaling}
        ytelse={utbetalingToShow.ytelse}
        utbetaling={sum}
        id={utbetalingToShow.id}
      />
    </>
  );
};

export default Utbetaling;
