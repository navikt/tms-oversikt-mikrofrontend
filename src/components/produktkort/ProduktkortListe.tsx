import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { mineSakerSakstemaerUrl } from "../../api/urls";
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
    url: "nav.no",
    tittel: "AAP",
    ikon: <IkonAAP />,
  },
  DAG: {
    url: "nav.no",
    tittel: "Dagpenger",
    ikon: <IkonDagpenger />,
  },
  FOR: {
    url: "nav.no",
    tittel: "Foreldrepenger",
    ikon: <IkonForeldrepenger />,
  },
  HJE: {
    url: "nav.no",
    tittel: "Hjelpemidler",
    ikon: <IkonHjelpemidler />,
  },
  KOM: {
    url: "nav.no",
    tittel: "Økonomisk sosialhjelp",
    ikon: <IkonØkonomiskSosialhjelp />,
  },
  PEN: {
    url: "nav.no",
    tittel: "Pensjon",
    ikon: <IkonPensjon />,
  },
  OMS: {
    url: "nav.no",
    tittel: "Pleiepenger",
    ikon: <IkonPleiepenger />,
  },
  SYK: {
    url: "nav.no",
    tittel: "Sykefravær",
    ikon: <IkonSykefravær />,
  },
  UFO: {
    url: "nav.no",
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
