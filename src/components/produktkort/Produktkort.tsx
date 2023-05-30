import { Next } from "@navikt/ds-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import ProduktConfig from "./ProduktConfig";
import style from "./Produktkort.module.css";

const Produktkort = ({ produktConfig }: { produktConfig: ProduktConfig }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.ikonOgTekst}>
        {produktConfig.ikon}
        <div>
          <Heading size="small" level="2">
            {produktConfig.tittel}
          </Heading>
          <BodyLong size="medium">Oversikt over saken din</BodyLong>
        </div>
      </div>
      <Next className={style.chevron} fontSize="24px" />
    </div>
  );
};

export default Produktkort;
