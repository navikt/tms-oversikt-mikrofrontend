import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Tag } from "@navikt/ds-react";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { antallVarslerUrl, innboksUrl } from "../../api/urls";
import { Language, LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import styles from "./Innboks.module.css";

const MeldingTag = ({ innbokser, language }: { innbokser: number; language: Language }) => {
  if (innbokser > 0) {
    return (
      <Tag variant="alt3-filled" size="small">
        {innbokser === 1 ? text.innboksNyMeldingEntall[language] : text.innboksNyMeldingFlertall[language](innbokser)}
      </Tag>
    );
  } else {
    return (
      <Tag variant="neutral-moderate" size="small">
        {text.innboksIngenNyMeldinger[language]}
      </Tag>
    );
  }
};

const Innboks = () => {
  const language = useContext(LanguageContext);
  const { data: varsler, isLoading } = useSWRImmutable(antallVarslerUrl, fetcher);
  if (isLoading) {
    return null;
  }

  const innbokser = varsler?.innbokser;
  const type = innbokser > 0 ? "NyMelding" : "IngenNyMelding";
  return (
    <div className={styles.componentWrapper}>
      <div className={styles.container}>
        <a className={`${styles.headerContainer} ${styles[`headerContainer${type}`]}`} href={innboksUrl}>
          <BodyShort as="h2">{text.kommunikasjonsFlisLenketekstInnboks[language]}</BodyShort>
          <div className={styles.tagChevron}>
            <MeldingTag innbokser={innbokser} language={language} />
            <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
          </div>
        </a>
        <div className={`${styles.bodyContainer} ${styles[`bodyContainer${type}`]}`}>
          <BodyLong>{text.kommunikasjonsFlisIngressInnboks[language]}</BodyLong>
        </div>
      </div>
    </div>
  );
};

export default Innboks;
