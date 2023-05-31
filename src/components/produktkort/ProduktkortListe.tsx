import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import {mineSakerSakstemaerUrl } from "../../api/urls"
import ProduktConfig, { produktConfigMap } from "./ProduktConfig";
import Produktkort from "./Produktkort";
import style from "./ProduktkortListe.module.css";

type Sakstemaer = Array<{ kode: string }>;

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
            produktConfigMap[sakstema.kode] != undefined && <Produktkort produktConfig={produktConfigMap[sakstema.kode]} />
          )}
      </div>
    );
  }
};

export default ProduktkortListe;
