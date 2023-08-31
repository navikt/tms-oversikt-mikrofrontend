import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, Heading } from "@navikt/ds-react";
import { useContext } from "react";
import { dialogMedVeilederUrl } from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { text } from "../../language/text";
import styles from "./DialogVeileder.module.css";
import { logNavigereEvent } from "../../utils/amplitude";

const DialogVeileder = () => {
  const language = useContext(LanguageContext);

  return (
    <a
      className={styles.container}
      href={dialogMedVeilederUrl}
      onClick={() => logNavigereEvent("dialog-veileder", "personlig", "Dialog med veilederen din")}
    >
      <div className={styles.headerContainer}>
        <Heading size="small" level="2">
          {text.kommunikasjonsFlisLenketekstDialog[language]}
        </Heading>
        <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
      </div>
      <BodyLong className={styles.text}>{text.kommunikasjonsFlisIngressDialog[language]}</BodyLong>
    </a>
  );
};

export default DialogVeileder;
