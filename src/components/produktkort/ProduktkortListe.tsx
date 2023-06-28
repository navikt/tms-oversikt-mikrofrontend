import ProduktConfig from "./ProduktConfig";
import Produktkort from "./Produktkort";
import styles from "./ProduktkortListe.module.css";

const ProduktkortListe = ({ produktConfigs }: { produktConfigs: ProduktConfig[] }) => {
  if (produktConfigs == undefined || produktConfigs.length == 0) {
    return <></>;
  } else {
    return (
      <div className={styles.listeContainer}>
        {produktConfigs.map((produktConfig) => (
          <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
        ))}
      </div>
    );
  }
};

export default ProduktkortListe;
