import React from "react";
import { jobb, hjelpemidler, personopplysning, annet } from "./Lenker";
import { useTranslate } from "../../hooks/useTranslate";
import { Heading } from "@navikt/ds-react";
import LenkeListe from "./LenkeListe";
import style from "./InnloggedeTjenester.module.css";

const InnloggedeTjenester = () => {

  return (  
    <div className={style.background}>
      <Heading level="4" size="small" className={style.tittel}>{useTranslate("alleInnloggedeTjenesterTittel")}</Heading>
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
