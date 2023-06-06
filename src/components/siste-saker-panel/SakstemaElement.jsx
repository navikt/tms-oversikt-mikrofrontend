import { useContext } from "react";
import { BodyLong, Detail } from "@navikt/ds-react";
import { Next, FileContent } from "@navikt/ds-icons";
import CSS from "./SakstemaElement.module.css";
import { LanguageContext } from "../../language/LanguageProvider";
import { logEvent } from "../../utils/amplitude";
import { text } from "../../language/text";
import { formatDateMonth } from "../../language/i18n";

const SakstemaElement = ({ href, sakstema, sistEndret }) => {
  const language = useContext(LanguageContext);

  return (
    <a className={CSS.element} href={href} onClick={() => logEvent("navigere", "Siste saker - " + sakstema)}>
      <div className={CSS.content_wrapper}>
        <div>
          <div className={CSS.lenketekst}>{sakstema}</div>
          <BodyLong size="small" className={CSS.dato}>
            {text.sisteSakerLenkedetail[language] + formatDateMonth(sistEndret)}
          </BodyLong>
        </div>
      </div>
      <Next className={CSS.chevron} fontSize="1.5rem" />
    </a>
  );
};

export default SakstemaElement;
