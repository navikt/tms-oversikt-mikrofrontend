import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import ProduktConfig from "./ProduktConfig";
import styles from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktConfig }) => {
  return (
    <a className={styles.container} href={produktConfig.url}>
      <div className={styles.ikonOgTekstContainer}>
        {produktConfig.ikon}
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
