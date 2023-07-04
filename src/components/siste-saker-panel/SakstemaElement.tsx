import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import { LanguageContext } from "../../language/LanguageProvider";
import { logNavigereEvent } from "../../utils/amplitude";
import { formatDateMonth } from "../../language/i18n";
import { text } from "../../language/text";
import styles from "./SakstemaElement.module.css";

type Props = {
  href: string;
  sakstema: string;
  sistEndret: string;
};

const SakstemaElement = ({ href, sakstema, sistEndret }: Props) => {
  const language = useContext(LanguageContext);

  return (
    <a className={styles.container} href={href} onClick={() => logNavigereEvent("dokumentarkiv", "generell", sakstema)}>
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