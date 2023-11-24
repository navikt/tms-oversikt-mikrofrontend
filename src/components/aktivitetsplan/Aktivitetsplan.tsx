import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import { aktivitetsplanUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { logNavigereEvent } from "../../utils/amplitude";
import styles from "./Aktivitetsplan.module.css";
import { text } from "../../language/text";

const Aktivitetsplan = () => {
  const language = useContext(LanguageContext);

  return (
    <a
      className={styles.container}
      href={aktivitetsplanUrl}
      onClick={() => logNavigereEvent("aktivitetsplan", "personlig", "Aktivitetsplan")}
    >
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          {text.aktivitetsplanTittel[language]}
        </Heading>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </div>
      <BodyLong className={styles.text}>{text.aktivitetsplanIngress[language]}</BodyLong>
    </a>
  );
};

export default Aktivitetsplan;
