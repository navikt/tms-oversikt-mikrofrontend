import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import { LanguageContext } from "../../language/LanguageProvider";
import { formatDateMonth } from "../../language/i18n";
import { text } from "../../language/text";
import { logEvent } from "../../utils/amplitude";
import styles from "./SakstemaElement.module.css";

const SakstemaElement = ({ href, sakstema, sistEndret }) => {
  const language = useContext(LanguageContext);

  return (
    <a className={styles.container} href={href} onClick={() => logEvent("navigere", "Siste saker - " + sakstema)}>
      <div>
        <Heading size="small" level="2">
          {sakstema}
        </Heading>
        <BodyLong className={styles.dato}>
          {text.sisteSakerLenkedetail[language] + formatDateMonth(sistEndret)}
        </BodyLong>
      </div>
      <ChevronRightIcon className={styles.chevron} fontSize="24px" />
    </a>
  );
};

export default SakstemaElement;
