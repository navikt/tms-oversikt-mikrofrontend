import { useContext } from "react";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { LinkPanel } from "@navikt/ds-react";
import { logEvent } from "../../utils/amplitude";
import { utbetalingsoversiktUrl } from "../../api/urls";
import { Money } from "@navikt/ds-icons";
import CSS from "./Utbetaling.module.css";

const Utbetaling = ({ size }) => {
  const language = useContext(LanguageContext);

  return (
    <>
      <LinkPanel
        className={size === "large" ? CSS.flis_large : CSS.flis}
        href={utbetalingsoversiktUrl}
        border={false}
        onClick={() => logEvent("navigere", "Dine utbetalinger")}
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
