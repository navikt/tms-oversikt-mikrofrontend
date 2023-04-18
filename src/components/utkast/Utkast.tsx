import React, { useContext } from "react";
import { fetcher } from "../../api/api";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import useSWRImmutable from "swr/immutable";
import { antallUtkastUrl, minSideUtkastUrl, digisosAntallUtkastUrl } from "../../api/urls";
import Card from "../card/Card";

const Utkast = () => {
  const { data: utkastAntall, isLoading: utkastLoading } = useSWRImmutable(antallUtkastUrl, fetcher);
  const { data: digisosAntall, isLoading: digisosLoading } = useSWRImmutable(digisosAntallUtkastUrl, fetcher);
  const language = useContext(LanguageContext);

  const antall = (utkastAntall ? utkastAntall?.antall : 0) + (digisosAntall ? digisosAntall?.antall : 0);
  const showUtkast = antall > 0;
  const entall = antall === 1;

  const tittel = text.utkastTittel[language];

  const ingress = entall ?
    text.utkastIngressEntall[language]
  :
    text.utkastIngressFlertall[language](antall.toString())
  ;

  if(utkastLoading || digisosLoading) {
    return null;
  }

  return (
    <>
      {showUtkast ?
        <Card
          tittel={tittel}
          ingress={ingress}
          type="utkast"
          url={minSideUtkastUrl}
        />
        : null
      }
    </>
  );
};

export default Utkast;
