import { ChevronRightIcon } from "@navikt/aksel-icons";
import { BodyLong, BodyShort, Tag } from "@navikt/ds-react";
import React from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { antallVarslerUrl } from "../../api/urls";
import styles from "./Innboks.module.css";

const MeldingTag = ({ innbokser }: { innbokser: number }) => {
  if (innbokser > 0) {
    return <Tag variant="alt3-filled" size="small">
    {innbokser === 1 ? "1 ny melding" : `${innbokser} nye meldinger`}
  </Tag>
  } else {
    return (
      <Tag variant="neutral-moderate" size="small">
        Ingen nye meldinger
      </Tag>
    );
  }
};

const Innboks = () => {
  const { data: varsler, isLoading } = useSWRImmutable(antallVarslerUrl, fetcher);
  const innbokser = varsler?.innbokser;

  if (isLoading) {
    return null;
  }

  const type = innbokser > 0 ? "nyMelding" : "ingenNyMelding"

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.container}>
        <div className={`${styles.headerContainer} ${styles[`${type}`]}`}>
          <BodyShort>Innboks</BodyShort>
          <div className={styles.tagChevron}>
            <MeldingTag innbokser={innbokser}/>
            <ChevronRightIcon className={styles.chevron} aria-hidden fontSize="24px" />
          </div>
        </div>

        <div className={`${styles.bodyContainer} ${styles[`${type}`]}`}>
          <BodyLong>
            Informasjon fra NAV og svar på henvendelser og referater fra samtaler du har på telefon, chat og “Skriv til
            oss”.
          </BodyLong>
        </div>
      </div>
    </div>
  );
};

export default Innboks;
