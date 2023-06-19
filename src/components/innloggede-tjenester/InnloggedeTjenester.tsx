import React, { useContext } from "react";
import { jobb, hjelpemidler, personopplysning, annet } from "./Lenker";
import { useTranslate } from "../../hooks/useTranslate";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { LanguageContext } from "../../language/LanguageProvider";
import LenkeListe from "./LenkeListe";
import styles from "./InnloggedeTjenester.module.css";

const InnloggedeTjenester = () => {
  const language = useContext(LanguageContext);

  const isEnglish = language === "en";

  return (  
    <div className={styles.container}>
      <Heading level="2" size="small" className={styles.tittel}>{useTranslate("innloggedeTjenesterTittel")}</Heading>
      {isEnglish ? <BodyShort size="medium" className={styles.disclaimer}>{useTranslate("alleTjenesterDisclaimer")}</BodyShort> : null}
      <nav className={styles.contentContainer}>
        <div className={styles.listColumn}>
          <LenkeListe tittel={useTranslate("jobbOgOppfolgingTittel")} liste={jobb}/>
          <LenkeListe tittel={useTranslate("pengeStøtteOgHjelpemidlerTittel")} liste={hjelpemidler}/>
        </div>
        <div className={styles.listColumn}>
          <LenkeListe tittel={useTranslate("personopplysningTittel")} liste={personopplysning}/>
          <LenkeListe tittel={useTranslate("annetTittel")} liste={annet}/>
        </div>
      </nav>
    </div>
  );
};

export default InnloggedeTjenester;
