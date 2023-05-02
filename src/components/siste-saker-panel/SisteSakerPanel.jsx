import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LinkPanel, Panel, Heading } from "@navikt/ds-react";
import SakstemaElement from "./SakstemaElement";
import { FileContent } from "@navikt/ds-icons";
import CSS from "./SisteSakerPanel.module.css";
import { mineSakerUrl, mineSakerApiUrl } from "../../api/urls";
import { fetcher } from "../../api/api";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { logEvent } from "../../utils/amplitude";

const SisteSakerPanel = () => {
  const { data: saker } = useSWRImmutable(mineSakerApiUrl, fetcher);

  const language = useContext(LanguageContext);

  const visStortSakspanel = saker?.sakstemaer?.length > 0;

  return (
    <>
      {visStortSakspanel ? (
        <Panel className={CSS.panel}>
          <div className={CSS.heading}>
            <Heading spacing level="2" size="medium">
              {text.sisteSakerTittel[language]}
            </Heading>
            <a className={CSS.alle_saker} href={mineSakerUrl} onClick={() => logEvent("Siste saker - Se alle")}>
              {text.seAlle[language]}
            </a>
          </div>
          {saker?.sakstemaer.slice(0, 2).map((sak) => (
            <SakstemaElement
              key={sak.kode}
              href={sak.detaljvisningUrl}
              sakstema={sak.navn}
              sistEndret={sak.sistEndret}
            />
          ))}
        </Panel>
      ) : (
        <LinkPanel
          href={mineSakerUrl}
          border={false}
          className={CSS.panel_liten}
          onClick={() => logEvent("Siste saker liten")}
        >
          <div
            style={{
              display: "grid",
              gridAutoFlow: "column",
              gap: "var(--navds-spacing-8)",
              alignItems: "center",
            }}
          >
            <div className={CSS.ikon}>
              <FileContent fontSize="1.375rem" />
            </div>
            <LinkPanel.Title className={CSS.panel_liten_tittel}>{text.sisteSakerTittel[language]}</LinkPanel.Title>
          </div>
        </LinkPanel>
      )}
    </>
  );
};

export default SisteSakerPanel;
