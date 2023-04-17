import React, { useContext } from "react";
import { LanguageContext } from "../../../../tms-min-side-tjenester/src/utils/LanguageProvider";
import { text } from "../../../../tms-min-side-tjenester/src/language/text";
import { LinkPanel } from "@navikt/ds-react";
import { utbetalingsoversiktUrl } from "../../../../tms-min-side-tjenester/src/api/urls";
import { Money } from "@navikt/ds-icons";
import { logAmplitudeEvent } from "../../../../tms-min-side-tjenester/src/utils/amplitude";
import CSS from "./Utbetaling.module.css";

const Utbetaling = ({ size }) => {
  const language = useContext(LanguageContext);

  return (
    <>
      <LinkPanel
        className={size === "large" ? CSS.flis_large : CSS.flis}
        href={utbetalingsoversiktUrl}
        border={false}
        onClick={() => logAmplitudeEvent("Dine utbetalinger")}
      >
        <div className={CSS.content_wrapper}>
          <div className={CSS.ikon}>
            <Money fontSize="1.375rem" />
          </div>
          <LinkPanel.Title className={CSS.tekst}>{text.utbetalingerLenketekst[language]}</LinkPanel.Title>
        </div>
      </LinkPanel>
    </>
  );
};

export default Utbetaling;
