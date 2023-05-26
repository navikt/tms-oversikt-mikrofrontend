import { Next } from "@navikt/ds-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import style from "./Produktkort.module.css";
import IkonForeldrepenger from "../../assets/IkonForeldrepenger";
import IkonPensjon from "../../assets/IkonPensjon";
import IkonDagpenger from "../../assets/IkonDagpenger";
import IkonHjelpemidler from "../../assets/IkonHjelpemidler";
import IkonØkonomiskSosialhjelp from "../../assets/IkonØkonomiskSosialhjelp";
import IkonPleiepenger from "../../assets/IkonPleiepenger";
import IkonSykefravær from "../../assets/IkonSykefravær";
import IkonUføretrygd from "../../assets/IkonUføretrygd";
import IkonAAP from "../../assets/IkonAAP";

type ProduktConfig = { url: string; tittel: string; ikon: JSX.Element };

const configMap: Record<string, ProduktConfig> = {
  aap: {
    url: "nav.no",
    tittel: "AAP",
    ikon: <IkonAAP />,
  },
  dagpenger: {
    url: "nav.no",
    tittel: "Dagpenger",
    ikon: <IkonDagpenger />,
  },
  foreldrepenger: {
    url: "nav.no",
    tittel: "Foreldrepenger",
    ikon: <IkonForeldrepenger />,
  },
  hjelpemidler: {
    url: "nav.no",
    tittel: "Hjelpemidler",
    ikon: <IkonHjelpemidler />,
  },
  økonomiskSosialhjelp: {
    url: "nav.no",
    tittel: "Økonomisk sosialhjelp",
    ikon: <IkonØkonomiskSosialhjelp />,
  },
  pensjon: {
    url: "nav.no",
    tittel: "Pensjon",
    ikon: <IkonPensjon />,
  },
  pleiepenger: {
    url: "nav.no",
    tittel: "Pleiepenger",
    ikon: <IkonPleiepenger />,
  },
  sykefravær: {
    url: "nav.no",
    tittel: "Sykefravær",
    ikon: <IkonSykefravær />,
  },
  uføretrygd: {
    url: "nav.no",
    tittel: "Uføretrygd",
    ikon: <IkonUføretrygd />,
  },
};

const Produktkort = ({ produkt }: { produkt: string }) => {
  const config = configMap[produkt];

  return (
    <div className={style.wrapper}>
      <div className={style.ikonOgTekst}>
        {config.ikon}
        <div>
          <Heading size="small" level="2">
            {config.tittel}
          </Heading>
          <BodyLong size="medium">Oversikt over saken din</BodyLong>
        </div>
      </div>
      <Next className={style.chevron} fontSize="24px" />
    </div>
  );
};

export default Produktkort;
