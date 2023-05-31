import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import ProduktConfig from "./ProduktConfig";
import style from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktConfig }) => {
  return (
    <a className={style.wrapper} href={produktConfig.url}>
      <div className={style.ikonOgTekst}>
        {produktConfig.ikon}
        <div>
          <Heading size="small" level="2">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">Oversikt over saken din</BodyLong>
        </div>
      </div>
      <ChevronRightIcon className={style.chevron} fontSize="24px" />
    </a>
  );
};

export default Produktkort;
