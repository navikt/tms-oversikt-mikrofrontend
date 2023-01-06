import React from "react";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { antallUtkastUrl, minSideUtkastUrl } from "../../api/urls";
import Card from "../card/Card";

const Utkast = () => {
  const { data: data } = useQuery(antallUtkastUrl, fetcher);
  const translate = useIntl();

  const antall = 2//data?.antall;
  const showUtkast = antall > 0;
  const entall = antall === 1;

  const tittel = translate.formatMessage({ id: "utkast.tittel" });

  const ingress = entall ? 
    translate.formatMessage({ id: "utkast.ingress.entall" })
  :
    translate.formatMessage({ id: "utkast.ingress.flertall" }, { antall: antall })
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
