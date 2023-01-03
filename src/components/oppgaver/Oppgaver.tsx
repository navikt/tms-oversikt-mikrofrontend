import React from "react";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { beskjederApiUrl, minSideVarslingerUrl, oppgaverApiUrl } from "../../api/urls";
import Card from "../card/Card";

const Oppgaver = () => {
  const { data: oppgaver } = useQuery(oppgaverApiUrl, fetcher);
  const { data: beskjeder } = useQuery(beskjederApiUrl, fetcher);

  const translate = useIntl();

  const antallOppgaver = oppgaver?.length;
  const antallBeskjeder = beskjeder?.length;

  const hasOppgaver = antallOppgaver > 0;
  const hasBeskjeder = antallBeskjeder > 0;
  const hasVarsler = hasOppgaver || hasBeskjeder;
  const hasOppgaverAndBeskjeder = hasOppgaver && hasBeskjeder;
  const oppgaveEntall = antallOppgaver === 1;
  const beskjedEntall = antallBeskjeder === 1;

  const tittel = translate.formatMessage({ id: "varsel" });

    const oppgaveTekst = hasOppgaver ? translate.formatMessage(
        (oppgaveEntall ? 
            {id: "varsel.ingress.oppgave.entall"} 
            : 
            {id: "varsel.ingress.oppgave.flertall"}), {antallOppgaver: antallOppgaver})
        : "";

    const beskjedOgOppgaver = hasOppgaverAndBeskjeder ? translate.formatMessage({id: "varsel.oppgaver.og.beskjeder"}) : "";

    const beskjedTekst = hasBeskjeder ? translate.formatMessage(beskjedEntall ? 
            {id: "varsel.ingress.beskjed.entall"} 
            : 
            ({id: "varsel.ingress.beskjed.flertall"}), {antallBeskjeder: antallBeskjeder})
        : "";
  
  const ingress = hasVarsler ? (oppgaveTekst + beskjedOgOppgaver + beskjedTekst) : translate.formatMessage({ id: "varsel.ingress.ingen.varsler" });

  const type = hasVarsler ? "oppgave" : "ingenOppgaver";

return(
        <Card 
            tittel={tittel}
            ingress={ingress}
            type={type}
            url={minSideVarslingerUrl}
        />
    )
};

export default Oppgaver;