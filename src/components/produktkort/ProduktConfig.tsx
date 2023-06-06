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
import { produktlinker as produktUrls } from "./ProduktUrls";
import { produktText } from "./ProduktText";

type ProduktConfig = { url: string; tittel: string; ingress: string, ikon: JSX.Element };

export function getProduktConfigMap(): Record<string, ProduktConfig> {
  const language = useContext(LanguageContext);

  return {
    DAG: {
      url: produktUrls.dagpenger[language],
      tittel: produktText.dagpenger[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonDagpenger />,
    },
    FOR: {
      url: produktUrls.foreldrepenger[language],
      tittel: produktText.foreldrepenger[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonForeldrepenger />,
    },
    HJE: {
      url: produktUrls.hjelpemidler[language],
      tittel: produktText.hjelpemidler[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonHjelpemidler />,
    },
    KOM: {
      url: produktUrls.sosialhjelp[language],
      tittel: produktText.sosialhjelp[language],
      ingress: produktText.sosialhjelpIngress[language],
      ikon: <IkonØkonomiskSosialhjelp />,
    },
    PEN: {
      url: produktUrls.pensjon[language],
      tittel: produktText.pensjon[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonPensjon />,
    },
    OMS: {
      url: produktUrls.pleiepenger[language],
      tittel: produktText.pleiepenger[language],
      ingress: produktText.pleiepengeIngress[language],
      ikon: <IkonPleiepenger />,
    },
    SYK: {
      url: produktUrls.sykefravær[language],
      tittel: produktText.sykefravær[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonSykefravær />,
    },
    SYM: {
      url: produktUrls.sykefravær[language],
      tittel: produktText.sykefravær[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonSykefravær />,
    },
    UFO: {
      url: produktUrls.uføretrygd[language],
      tittel: produktText.uføretrygd[language],
      ingress: produktText.generellIngress[language],
      ikon: <IkonUføretrygd />,
    },
  };
}

export default ProduktConfig;
