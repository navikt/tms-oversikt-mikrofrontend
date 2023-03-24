import React, { useContext } from "react";
import { fetcher } from "../../api/api";
import useSWRImmutable from "swr/immutable";
import { antallVarslerUrl, minSideVarslerUrl } from "../../api/urls";
import { LanguageContext } from "../../utils/LanguageProvider";
import { text } from "../../language/text";
import Card from "../card/Card";

const Oppgaver = () => {

  const { data: data, isLoading } = useSWRImmutable(antallVarslerUrl, fetcher);
  const language = useContext(LanguageContext);

  const antallOppgaver = data?.oppgaver;
  const antallBeskjeder = data?.beskjeder + data?.innbokser;

  const hasOppgaver = antallOppgaver > 0;
  const hasBeskjeder = antallBeskjeder > 0;
  const hasVarsler = hasOppgaver || hasBeskjeder;
  const hasOppgaverAndBeskjeder = hasOppgaver && hasBeskjeder;
  const oppgaveEntall = antallOppgaver === 1;
  const beskjedEntall = antallBeskjeder === 1;

  const tittel = text.varsel[language];


  const oppgaveTekst =  
    hasOppgaver ? 
      (oppgaveEntall ? 
        text.varselIngressOppgaveEntall[language] 
        : 
        text.varselIngressOppgaveFlertall[language](antallOppgaver.toString())
      ) 
    : ""
  ;

  const beskjedOgOppgaver = hasOppgaverAndBeskjeder ? text.varselOppgaverOgBeskjeder[language] : "";
  
  const beskjedTekst =  
    hasBeskjeder ? 
      (beskjedEntall ? 
        text.varselIngressBeskjedEntall[language] 
        : 
        text.varselIngressBeskjedFlertall[language](antallBeskjeder.toString())
      ) 
    : ""
  ;
  
  const ingress = hasVarsler ? (oppgaveTekst + beskjedOgOppgaver + beskjedTekst) : text.varselIngressIngenVarsler[language];

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
