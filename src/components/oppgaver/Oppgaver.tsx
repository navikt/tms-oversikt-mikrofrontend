import React, { useContext } from "react";
import { fetcher } from "../../api/api";
<<<<<<< HEAD
import { useQuery } from "react-query";
=======
import { useIntl } from "react-intl";
import useSWRImmutable from "swr/immutable";
>>>>>>> main
import { antallVarslerUrl, minSideVarslerUrl } from "../../api/urls";
import { LanguageContext } from "../../utils/LanguageProvider";
import { text } from "../../language/text";
import Card from "../card/Card";

const Oppgaver = () => {
<<<<<<< HEAD
  const { data: data, isLoading } = useQuery(antallVarslerUrl, fetcher);

  const language = useContext(LanguageContext);
=======
  const { data: data, isLoading } = useSWRImmutable(antallVarslerUrl, fetcher);
  const translate = useIntl();
>>>>>>> main

  const antallOppgaver = data?.oppgaver;
  const antallBeskjeder = data?.beskjeder + data?.innbokser;

  const hasOppgaver = antallOppgaver > 0;
  const hasBeskjeder = antallBeskjeder > 0;
  const hasVarsler = hasOppgaver || hasBeskjeder;
  const hasOppgaverAndBeskjeder = hasOppgaver && hasBeskjeder;
  const oppgaveEntall = antallOppgaver === 1;
  const beskjedEntall = antallBeskjeder === 1;

  const tittel = text.varsel[language];

<<<<<<< HEAD
=======
    const oppgaveTekst = hasOppgaver ? translate.formatMessage(
        (oppgaveEntall ?
            {id: "varsel.ingress.oppgave.entall"}
            :
            {id: "varsel.ingress.oppgave.flertall"}), {antallOppgaver: antallOppgaver})
        : "";
>>>>>>> main

  const oppgaveTekst =  
    hasOppgaver ? 
      (oppgaveEntall ? 
        text.varselIngressOppgaveEntall[language] 
        : 
        text.varselIngressOppgaveFlertall[language](antallOppgaver.toString())
      ) 
    : ""
  ;

<<<<<<< HEAD
  const beskjedOgOppgaver = hasOppgaverAndBeskjeder ? text.varselOppgaverOgBeskjeder[language] : "";
  
  const beskjedTekst =  
    hasBeskjeder ? 
      (beskjedEntall ? 
        text.varselIngressBeskjedEntall[language] 
        : 
        text.varselIngressBeskjedFlertall[language](antallBeskjeder.toString())
        //antallBeskjeder
      ) 
    : ""
  ;
  
  const ingress = hasVarsler ? (oppgaveTekst + beskjedOgOppgaver + beskjedTekst) : text.varselIngressIngenVarsler[language];
=======
    const beskjedTekst = hasBeskjeder ? translate.formatMessage(beskjedEntall ?
            {id: "varsel.ingress.beskjed.entall"}
            :
            ({id: "varsel.ingress.beskjed.flertall"}), {antallBeskjeder: antallBeskjeder})
        : "";

  const ingress = hasVarsler ? (oppgaveTekst + beskjedOgOppgaver + beskjedTekst) : translate.formatMessage({ id: "varsel.ingress.ingen.varsler" });
>>>>>>> main

  const type = hasVarsler ? "oppgave" : "ingenOppgaver";

  if(isLoading) {
    return <Card
    tittel={tittel}
    ingress={"isLoading"}
    type={type}
    url={minSideVarslerUrl}
    />
  }

  return(
    <Card
        tittel={tittel}
        ingress={ingress}
        type={type}
        url={minSideVarslerUrl}
    />
  )
};

export default Oppgaver;
