import { useContext } from "react";
import {
  dagpengerProduktside,
  foreldrepengerProduktside,
  hjelpemidlerProduktside,
  pensjonProduktside,
  pleiepengerProduktside,
  sosialhjelpProduktside,
  sykefraværProduktside,
  uføretrygdProduktside,
} from "../../api/urls";
import IkonDagpenger from "../../assets/IkonDagpenger";
import IkonForeldrepenger from "../../assets/IkonForeldrepenger";
import IkonHjelpemidler from "../../assets/IkonHjelpemidler";
import IkonPensjon from "../../assets/IkonPensjon";
import IkonPleiepenger from "../../assets/IkonPleiepenger";
import IkonSykefravær from "../../assets/IkonSykefravær";
import IkonUføretrygd from "../../assets/IkonUføretrygd";
import IkonØkonomiskSosialhjelp from "../../assets/IkonØkonomiskSosialhjelp";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { produktlinker as produktUrls } from "./ProduktUrls";

type ProduktConfig = { url: string; tittel: string; ikon: JSX.Element };

export function getProduktConfigMap(): Record<string, ProduktConfig> {
  const language = useContext(LanguageContext);

  return {
    DAG: {
      url: produktUrls.dagpenger[language],
      tittel: text.dagpenger[language],
      ikon: <IkonDagpenger />,
    },
    FOR: {
      url: foreldrepengerProduktside,
      tittel: "Foreldrepenger",
      ikon: <IkonForeldrepenger />,
    },
    HJE: {
      url: hjelpemidlerProduktside,
      tittel: "Hjelpemidler",
      ikon: <IkonHjelpemidler />,
    },
    KOM: {
      url: sosialhjelpProduktside,
      tittel: "Økonomisk sosialhjelp",
      ikon: <IkonØkonomiskSosialhjelp />,
    },
    PEN: {
      url: pensjonProduktside,
      tittel: "Pensjon",
      ikon: <IkonPensjon />,
    },
    OMS: {
      url: pleiepengerProduktside,
      tittel: "Pleiepenger",
      ikon: <IkonPleiepenger />,
    },
    SYK: {
      url: sykefraværProduktside,
      tittel: "Sykefravær",
      ikon: <IkonSykefravær />,
    },
    SYM: {
      url: sykefraværProduktside,
      tittel: "Sykefravær",
      ikon: <IkonSykefravær />,
    },
    UFO: {
      url: uføretrygdProduktside,
      tittel: "Uføretrygd",
      ikon: <IkonUføretrygd />,
    },
  };
}

export default ProduktConfig;
