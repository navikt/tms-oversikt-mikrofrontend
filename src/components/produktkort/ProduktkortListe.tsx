import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import {
  aapProduktside,
  dagpengerProduktside,
  foreldrepengerProduktside,
  hjelpemidlerProduktside,
  mineSakerSakstemaerUrl,
  pensonProduktside,
  pleiepengerProduktside,
  sosialhjelpProduktside,
  sykefraværProduktside,
  uføretrygdProduktside,
} from "../../api/urls";
import IkonAAP from "../../assets/IkonAAP";
import IkonDagpenger from "../../assets/IkonDagpenger";
import IkonForeldrepenger from "../../assets/IkonForeldrepenger";
import IkonHjelpemidler from "../../assets/IkonHjelpemidler";
import IkonPensjon from "../../assets/IkonPensjon";
import IkonPleiepenger from "../../assets/IkonPleiepenger";
import IkonSykefravær from "../../assets/IkonSykefravær";
import IkonUføretrygd from "../../assets/IkonUføretrygd";
import IkonØkonomiskSosialhjelp from "../../assets/IkonØkonomiskSosialhjelp";
import ProduktConfig from "./ProduktConfig";
import Produktkort from "./Produktkort";
import style from "./ProduktkortListe.module.css";

type Sakstemaer = Array<{ kode: string }>;

const configMap: Record<string, ProduktConfig> = {
  AAP: {
    url: aapProduktside,
    tittel: "AAP",
    ikon: <IkonAAP />,
  },
  DAG: {
    url: dagpengerProduktside,
    tittel: "Dagpenger",
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
    url: pensonProduktside,
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
  UFO: {
    url: uføretrygdProduktside,
    tittel: "Uføretrygd",
    ikon: <IkonUføretrygd />,
  },
};

const ProduktkortListe = () => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const noSakstemaer = sakstemaer != undefined && sakstemaer.length == 0;
  if (noSakstemaer) {
    return <></>;
  } else {
    return (
      <div className={style.container}>
        {sakstemaer
          ?.sort((a, b) => a.kode.localeCompare(b.kode))
          .map(
            (sakstema) =>
              configMap[sakstema.kode] != undefined && <Produktkort produktConfig={configMap[sakstema.kode]} />
          )}
      </div>
    );
  }
};

export default ProduktkortListe;
