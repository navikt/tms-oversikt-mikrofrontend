import { useContext } from "react";
import { Money } from "@navikt/ds-icons";
import { LanguageContext } from "../../../language/LanguageProvider";
import { LinkPanel } from "@navikt/ds-react";
import { utbetalingsoversiktUrl } from "../urls";
import { logNavigereEvent } from "../../../utils/amplitude";
import { text } from "../../../language/text";
import CSS from "./LegacyUtbetaling.module.css";

const Utbetaling = ({ size }: { size: string}) => {
  const language = useContext(LanguageContext);

  return (
    <>
      <LinkPanel
        className={size === "large" ? CSS.flis_large : CSS.flis}
        href={utbetalingsoversiktUrl}
        border={false}
        onClick={() => logNavigereEvent("utbetalinger", "generell", "Dine utbetalinger")}
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
