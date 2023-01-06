import React from "react";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { antallUtkastUrl, minSideUtkastUrl, digisosUtkastApiUrl } from "../../api/urls";
import Card from "../card/Card";

const Utkast = () => {
  const { data: data } = useQuery(antallUtkastUrl, fetcher);
  const { data: digisosAntall } = useQuery(digisosUtkastApiUrl, fetcher);
  const translate = useIntl();

  const antallUtkast = data?.antall + digisosAntall?.antall;
  const showUtkast = antallUtkast > 0;
  const entall = antallUtkast === 1;

  const tittel = translate.formatMessage({ id: "utkast.tittel" });

  const ingress = entall ? 
    translate.formatMessage({ id: "utkast.ingress.entall" })
  :
    translate.formatMessage({ id: "utkast.ingress.flertall" }, { antall: antallUtkast })
  ;

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
