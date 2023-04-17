import React, { useContext } from "react";
import { LanguageContext } from "../../../../tms-min-side-tjenester/src/utils/LanguageProvider";
import { text } from "../../../../tms-min-side-tjenester/src/language/text";
import { logAmplitudeEvent } from "../../../../tms-min-side-tjenester/src/utils/amplitude";
import { formatDateMonth } from "../../../../tms-min-side-tjenester/src/language/i18n";
import { Detail } from "@navikt/ds-react";
import { Next, FileContent } from "@navikt/ds-icons";
import CSS from "./SakstemaElement.module.css";

const SakstemaElement = ({ href, sakstema, sistEndret }) => {
  const language = useContext(LanguageContext);

  return (
    <a className={CSS.element} href={href} onClick={() => logAmplitudeEvent("Siste saker - " + sakstema)}>
      <div className={CSS.content_wrapper}>
        <div className={CSS.ikon}>
          <FileContent fontSize="1.375rem" />
        </div>
        <div>
          <div className={CSS.lenketekst}>{sakstema}</div>
          <Detail spacing className={CSS.dato}>
            {text.sisteSakerLenkedetail[language] + formatDateMonth(sistEndret)}
          </Detail>
        </div>
      </div>
      <Next className={CSS.chevron} fontSize="1.5rem" />
    </a>
  );
};

export default SakstemaElement;
