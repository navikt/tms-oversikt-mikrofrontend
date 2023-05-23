import React, { useContext } from "react";
import { jobb, hjelpemidler, personopplysning, annet } from "./Lenker";
import { useTranslate } from "../../hooks/useTranslate";
import { BodyShort, Detail, Heading } from "@navikt/ds-react";
import { LanguageContext } from "../../language/LanguageProvider";
import LenkeListe from "./LenkeListe";
import style from "./InnloggedeTjenester.module.css";

const InnloggedeTjenester = () => {
  const language = useContext(LanguageContext);

  const isEnglish = true//language === "en";

  return (  
    <div className={style.background}>
      <Heading level="2" size="small" className={style.tittel}>{useTranslate("alleInnloggedeTjenesterTittel")}</Heading>
      {isEnglish ? <BodyShort size="medium" className={style.disclaimer}>Not all pages exist in English, in these cases the Norwegian page is provided.</BodyShort> : null}
      <nav className={style.container}>
        <div className={style.listeContainer}>
          <LenkeListe tittel={useTranslate("jobbOgOppfolgingTittel")} liste={jobb}/>
          <LenkeListe tittel={useTranslate("pengeStøtteOgHjelpemidlerTittel")} liste={hjelpemidler}/>
        </div>
        <div className={style.listeContainer}>
          <LenkeListe tittel={useTranslate("personopplysningTittel")} liste={personopplysning}/>
          <LenkeListe tittel={useTranslate("annetTittel")} liste={annet}/>
        </div>
      </nav>
    </div>
  );
};

export default InnloggedeTjenester;
