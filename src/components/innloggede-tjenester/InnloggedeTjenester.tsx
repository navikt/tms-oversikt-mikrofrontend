import React, { useContext } from "react";
import { hjelpemidlerLenker, jobbLenker, personopplysningLenker, annetLenker } from "./Lenker";
import { useTranslate } from "../../hooks/useTranslate";
import { BodyShort, Heading } from "@navikt/ds-react";
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
          <LenkeListe tittel={useTranslate("jobbOgOppfolgingTittel")} liste={jobbLenker}/>
          <LenkeListe tittel={useTranslate("pengeStøtteOgHjelpemidlerTittel")} liste={hjelpemidlerLenker}/>
        </div>
        <div className={styles.listColumn}>
          <LenkeListe tittel={useTranslate("personopplysningTittel")} liste={personopplysningLenker}/>
          <LenkeListe tittel={useTranslate("annetTittel")} liste={annetLenker}/>
        </div>
      </nav>
    </div>
  );
};

export default InnloggedeTjenester;
