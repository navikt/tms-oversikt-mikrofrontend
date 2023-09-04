import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Panel } from "@navikt/ds-react";
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
          <BodyShort as="h2" spacing>
            {text.sisteSakerTittel[language]}
          </BodyShort>
          {saker?.sakstemaer.slice(0, 2).map((sak: any) => (
            <SakstemaElement
              key={sak.kode}
              href={sak.detaljvisningUrl}
              sakstema={sak.navn}
              sistEndret={sak.sistEndret}
            />
          ))}
          <BodyShort className={styles.alleSakerWrapper}>
            <a
              className={styles.alleSaker}
              href={mineSakerUrl}
              onClick={() => logNavigereEvent("dokumentarkiv", "generell", "Se alle")}
            >
              {text.seAlle[language]}
            </a>
          </BodyShort>
        </Panel>
      ) : (
        <div className={styles.ingenDokumenterContainer}>
          <BodyShort as="h2" spacing>
            {text.sisteSakerTittel[language]}
          </BodyShort>
          <a className={styles.ingenDokumenterTextWrapper} href={mineSakerUrl}>
            <BodyLong>{text.ingenDokumenter[language]}</BodyLong>
            <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
          </a>
        </div>
      )}
    </>
  );
};

export default SisteSakerPanel;
