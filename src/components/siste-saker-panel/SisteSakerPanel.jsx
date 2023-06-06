import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { LinkPanel, Panel, Heading, BodyShort } from "@navikt/ds-react";
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
            <BodyShort size="medium" spacing="true">
              {text.sisteSakerTittel[language]}
            </BodyShort>
          </div>
          {saker?.sakstemaer.slice(0, 2).map((sak) => (
            <SakstemaElement
              key={sak.kode}
              href={sak.detaljvisningUrl}
              sakstema={sak.navn}
              sistEndret={sak.sistEndret}
            />
          ))}

          <a
            className={CSS.alle_saker}
            href={mineSakerUrl}
            onClick={() => logEvent("navigere", "Siste saker - Se alle")}
          >
            <BodyShort size="medium">{text.seAlle[language]}</BodyShort>
          </a>
        </Panel>
      ) : (
        <LinkPanel
          href={mineSakerUrl}
          border={false}
          className={CSS.panel_liten}
          onClick={() => logEvent("navigere", "Siste saker - panel uten saker")}
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
