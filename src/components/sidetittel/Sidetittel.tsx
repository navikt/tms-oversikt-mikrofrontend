import React from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { identUrl, navnUrl } from "../../api/urls";
import { Heading } from "@navikt/ds-react";
import { getVelkomsthilsen } from "./velkomsthilsen";
import style from "./Sidetittel.module.css";

const Sidetittel = () => {
  const { data: navn, error: navnFailed } = useSWRImmutable(navnUrl, fetcher);
  const { data: ident, error: identFailed } = useSWRImmutable(identUrl, fetcher);

  if ((!navn && !ident) || identFailed) {
    return null;
  }

  const navnOrIdent = navnFailed ? ident?.ident : navn?.navn.toLowerCase();
  const velkomsthilsen = getVelkomsthilsen();

  return (
    <div className={style.wrapper}>
      <Heading size={"large"} level="2" className={style.tekst}>
        <span>{velkomsthilsen}</span> <span className={style.navn}>{navnOrIdent}</span>
      </Heading>
    </div>
  );
};

export default Sidetittel;
