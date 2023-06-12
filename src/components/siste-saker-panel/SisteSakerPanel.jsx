import { FileContent } from "@navikt/ds-icons";
import { BodyShort, LinkPanel, Panel } from "@navikt/ds-react";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { mineSakerApiUrl, mineSakerUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { logNavigereEvent } from "../../utils/amplitude";
import SakstemaElement from "./SakstemaElement";
import styles from "./SisteSakerPanel.module.css";

const SisteSakerPanel = () => {
  const { data: saker } = useSWRImmutable(mineSakerApiUrl, fetcher);

  const language = useContext(LanguageContext);

  const visStortSakspanel = saker?.sakstemaer?.length > 0;

  return (
    <>
      {visStortSakspanel ? (
        <Panel className={styles.panel}>
          <BodyShort size="medium" spacing="true">
            {text.sisteSakerTittel[language]}
          </BodyShort>
          {saker?.sakstemaer.slice(0, 2).map((sak) => (
            <SakstemaElement
              key={sak.kode}
              href={sak.detaljvisningUrl}
              sakstema={sak.navn}
              sistEndret={sak.sistEndret}
            />
          ))}
          <BodyShort className={styles.alleSakerWrapper} size="medium">
            <a
              className={styles.alleSaker}
              href={mineSakerUrl}
              onClick={() => logNavigereEvent("Se alle saker inngang", "lenke", "siste-saker-panel", "Se alle")}
            >
              {text.seAlle[language]}
            </a>
          </BodyShort>
        </Panel>
      ) : (
        <LinkPanel
          href={mineSakerUrl}
          border={false}
          className={styles.panel_liten}
          onClick={() => logNavigereEvent("Siste saker inngang", "card", "siste-saker-panel", "Dine siste saker")}
        >
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gap: "var(--navds-spacing-8)",
              alignItems: "center",
            }}
          >
            <div className={styles.ikon}>
              <FileContent fontSize="1.375rem" />
            </div>
            <LinkPanel.Title className={styles.panel_liten_tittel}>{text.sisteSakerTittel[language]}</LinkPanel.Title>
          </div>
        </LinkPanel>
      )}
    </>
  );
};

export default SisteSakerPanel;
