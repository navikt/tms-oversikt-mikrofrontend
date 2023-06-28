import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { logNavigereEvent } from "../../utils/amplitude";
import ProduktConfig from "./ProduktConfig";
import styles from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktConfig }) => {
  return (
    <a
      className={styles.container}
      href={produktConfig.url}
      onClick={() => logNavigereEvent("produktkort", "personlig", produktConfig.produktnavn)}
    >
      <div className={styles.ikonOgTekstContainer}>
        <div>{produktConfig.ikon}</div>
        <div>
          <Heading size="small" level="2">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">{produktConfig.ingress}</BodyLong>
        </div>
      </div>
      <ChevronRightIcon className={styles.chevron} fontSize="24px" />
    </a>
  );
};

export default Produktkort;
