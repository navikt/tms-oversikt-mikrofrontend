import { DialogDots, Email } from "@navikt/ds-icons";
import { Heading, LinkPanel, Panel } from "@navikt/ds-react";
import { useContext } from "react";
import { dialogMedVeilederUrl, innboksUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { logNavigereEvent } from "../../utils/amplitude";
import KommunikasjonsElement from "./KommunikasjonsElement";
import CSS from "./KommunikasjonsFlis.module.css";

const KommunikasjonsFlis = ({ size }: { size: string }) => {
  const language = useContext(LanguageContext);

  return (
    <>
      {size === "large" ? (
        <Panel className={CSS.large}>
          <Heading spacing level="2" size="medium">
            {text.kommunikasjonsFlisTittel[language]}
          </Heading>
          <KommunikasjonsElement
            href={innboksUrl}
            tittel={text.kommunikasjonsFlisLenketekstInnboks[language]}
            ingress={text.kommunikasjonsFlisIngressInnboks[language]}
            ikon={<Email fontSize="1.375rem" />}
          />
          <KommunikasjonsElement
            href={dialogMedVeilederUrl}
            tittel={text.kommunikasjonsFlisLenketekstDialog[language]}
            ingress={text.kommunikasjonsFlisIngressDialog[language]}
            ikon={<DialogDots fontSize="1.375rem" />}
          />
        </Panel>
      ) : (
        <section>
          <LinkPanel
            href={innboksUrl}
            border={false}
            className={CSS.small}
            onClick={() => logNavigereEvent("innboks", "kommunikasjon", "Innboks")}
          >
            <div className={CSS.content_wrapper}>
              <div className={CSS.ikon_wrapper}>
                <Email fontSize="22px" />
              </div>
              <LinkPanel.Title className={CSS.small_tittel}>
                {text.kommunikasjonsFlisLenketekstInnboks[language]}
              </LinkPanel.Title>
            </div>
          </LinkPanel>
        </section>
      )}
    </>
  );
};

export default KommunikasjonsFlis;
