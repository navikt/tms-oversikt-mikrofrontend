import React, { useContext } from "react";
import { LanguageContext } from "../../../../tms-min-side-tjenester/src/utils/LanguageProvider";
import { text } from "../../../../tms-min-side-tjenester/src/language/text";
import { Bandage, DirectionSign, FillForms, PensionBag } from "@navikt/ds-icons";
import { arbeidUrl, dinPensjonUrl, soknadUrl, sykefravaerUrl } from "../../../../tms-min-side-tjenester/src/api/urls";
import Flis from "./Flis";
import CSS from "./GenerelleFliser.module.css";

const GenerelleFliser = () => {
  const language = useContext(LanguageContext);

  return (
    <section className={CSS.wrapper}>
      <Flis
        tittel={text.generelleFliserSykefravaer[language]}
        ikon={<Bandage fontSize="1.375rem" />}
        href={sykefravaerUrl}
      />
      <Flis
        tittel={text.generelleFliserMistetJobb[language]}
        ikon={<DirectionSign fontSize="1.375rem" />}
        href={arbeidUrl}
      />
      <Flis tittel={text.generelleFliserSkjemaer[language]} ikon={<FillForms fontSize="1.375rem" />} href={soknadUrl} />
      <Flis
        tittel={text.generelleFliserPensjon[language]}
        ikon={<PensionBag fontSize="1.375rem" />}
        href={dinPensjonUrl}
      />
    </section>
  );
};

export default GenerelleFliser;
