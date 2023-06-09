import { useContext } from "react";
import { Detail } from "@navikt/ds-react";
import { Next, FileContent } from "@navikt/ds-icons";
import CSS from "./SakstemaElement.module.css";
import { LanguageContext } from "../../language/LanguageProvider";
import { logNavigereEvent } from "../../utils/amplitude";
import { text } from "../../language/text";
import { formatDateMonth } from "../../language/i18n";

const SakstemaElement = ({ href, sakstema, sistEndret }) => {
  const language = useContext(LanguageContext);

  return (
    <a
      className={CSS.element}
      href={href}
      onClick={() => logNavigereEvent("Sakstemalenke", "lenke", "siste-saker-panel", sakstema)}
    >
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
