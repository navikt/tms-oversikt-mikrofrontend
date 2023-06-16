import { BodyShort } from "@navikt/ds-react";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { mineSakerSakstemaerUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { getProduktConfigMap } from "./ProduktConfig";
import { produktText } from "./ProduktText";
import Produktkort from "./Produktkort";
import styles from "./ProduktkortListe.module.css";

type Sakstemaer = Array<{ kode: string }>;

const ProduktkortListe = () => {
  const language = useContext(LanguageContext);
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const produktConfigMap = getProduktConfigMap();

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index
  );

  if (uniqueProduktConfigs == undefined || uniqueProduktConfigs.length == 0) {
    return <></>;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing="true">
          {produktText.oversiktTittel[language]}
        </BodyShort>
        <div className={styles.listeContainer}>
          {uniqueProduktConfigs.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default ProduktkortListe;
