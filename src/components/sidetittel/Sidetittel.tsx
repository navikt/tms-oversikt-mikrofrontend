import React from "react";
import { useQuery } from "react-query";
import { fetcher } from "../../api/api";
import { useIntl } from "react-intl";
import { identUrl, navnUrl } from "../../api/urls";
import { Heading } from "@navikt/ds-react";
import { getVelkomsthilsen } from "./velkomsthilsen";
import style from "./Sidetittel.module.css";

const Sidetittel = () => {
  const { data: navn, isError: navnFailed } = useQuery(navnUrl, fetcher);
  const { data: ident, isError: identFailed } = useQuery(identUrl, fetcher);
  const translate = useIntl();

  if ((!navn && !ident) || identFailed) {
    return null;
  }

  const navnOrIdent = navnFailed ? ident?.ident : navn?.navn.toLowerCase();
  const velkomsthilsen = getVelkomsthilsen();

  return (
    <section className={style.wrapper}>
      <Heading size={"large"} level="2" className={style.tekst}>
        <span>{translate.formatMessage({ id: velkomsthilsen })}</span> <span className={style.navn}>{navnOrIdent}</span>
      </Heading>
    </section>
  );
};

export default Sidetittel;
