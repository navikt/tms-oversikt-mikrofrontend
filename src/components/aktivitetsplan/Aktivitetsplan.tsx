import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import { dialogMedVeilederUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { logNavigereEvent } from "../../utils/amplitude";
import styles from "./Aktivitetsplan.module.css";

const Aktivitetsplan = () => {
  const language = useContext(LanguageContext);

  return (
    <a
      className={styles.container}
      href={dialogMedVeilederUrl}
      onClick={() => logNavigereEvent("aktivitetsplan", "personlig", "Aktivitetsplan")}
    >
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          Aktivitetsplan
        </Heading>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </div>
      <BodyLong className={styles.text}>Aktiviteter og snurrepipperier</BodyLong>
    </a>
  );
};

export default Aktivitetsplan;
