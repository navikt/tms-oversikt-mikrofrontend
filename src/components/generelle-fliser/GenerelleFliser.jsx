import { useContext } from "react";
import Flis from "./Flis";
import { Bandage, DirectionSign, FillForms, PensionBag } from "@navikt/ds-icons";
import CSS from "./GenerelleFliser.module.css";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import { arbeidUrl, dinPensjonUrl, soknadUrl, sykefravaerUrl } from "../../api/urls";

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
