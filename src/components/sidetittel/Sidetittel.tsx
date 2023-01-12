import React from "react";
import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { identUrl, navnUrl } from "../../api/urls";
import { Heading } from "@navikt/ds-react";
import { getVelkomsthilsen } from "./velkomsthilsen";
import SidetittelCSS from "./Sidetittel.module.css";

const Sidetittel = () => {
  const { data: navn, isError: navnFailed } = useQuery(navnUrl, fetcher);
  const { data: ident, isError: identFailed } = useQuery(identUrl, fetcher);
  const translate = useIntl();

  if ((!navn && !ident) || identFailed) {
    return null;
  }

  const navnOrIdent = navnFailed ? ident?.ident : navn?.navn.toLowerCase();
  const velkomsthilsen = getVelkomsthilsen();
  console.log(getVelkomsthilsen());

  return (
    <section className={SidetittelCSS.wrapper}>
      <Heading size={"large"} level="2" className={SidetittelCSS.tekst}>
        {translate.formatMessage({ id: velkomsthilsen })}{navnOrIdent}
      </Heading>
    </section>
  );
};

export default Sidetittel;
