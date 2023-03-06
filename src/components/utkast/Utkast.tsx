import React from "react";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import useSWRImmutable from "swr/immutable";
import { antallUtkastUrl, minSideUtkastUrl, digisosUtkastApiUrl } from "../../api/urls";
import Card from "../card/Card";

const Utkast = () => {
  const { data: utkastAntall, isLoading: utkastLoading } = useSWRImmutable(antallUtkastUrl, fetcher);
  const { data: digisosAntall, isLoading: digisosLoading } = useSWRImmutable(digisosUtkastApiUrl, fetcher);
  const translate = useIntl();

  const antall = (utkastAntall ? utkastAntall?.antall : 0) + (digisosAntall ? digisosAntall?.antall : 0);
  const showUtkast = antall > 0;
  const entall = antall === 1;

  const tittel = translate.formatMessage({ id: "utkast.tittel" });

  const ingress = entall ?
    translate.formatMessage({ id: "utkast.ingress.entall" })
  :
    translate.formatMessage({ id: "utkast.ingress.flertall" }, { antall: antall })
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
