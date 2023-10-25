import { BodyShort } from "@navikt/ds-react";
import { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import {
  arbeidssokerUrl,
  featureToggleUrl,
  meldekortApiUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  oppfolgingUrl,
} from "../../api/urls";
import { LanguageContext } from "../../language/LanguageProvider";
import { setIsError } from "../../store/store";
import { logEvent } from "../../utils/amplitude";
import DialogVeileder from "../dialog-veileder/DialogVeileder";
import { getProduktConfigMap } from "../produktkort/ProduktConfig";
import { produktText } from "../produktkort/ProduktText";
import Produktkort from "../produktkort/Produktkort";
import styles from "./DinOversikt.module.css";
import { EnabledMicrofrontends } from "./microfrontendTypes";
import MicrofrontendWrapper from "./MicrofrontendWrapper";
import AiaStandardWrapper from "../arbeidssoker/AiaStandardWrapper";
import { FeatureToggles } from "../../utils/featuretoggles";
import { MeldekortDataFraApi, isMeldekortbruker } from "../meldekort/meldekortTypes";
import MeldekortWrapper from "../meldekort/MeldekortWrapper";

type Sakstemaer = Array<{ kode: string }>;

const getUniqueProdukter = () => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const produktConfigMap = getProduktConfigMap();

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index,
  );

  return uniqueProduktConfigs;
};

const DinOversikt = () => {
  const language = useContext(LanguageContext);

  const { data: featureToggles } = useSWRImmutable<FeatureToggles>(featureToggleUrl, fetcher);

  const { data: enabledMicrofrontends } = useSWRImmutable<EnabledMicrofrontends>(microfrontendsUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => data.microfrontends.map((mf) => logEvent(`minside.${mf.microfrontend_id}`, true)),
  });

  const { data: meldekortFraApi } = useSWRImmutable<MeldekortDataFraApi>(meldekortApiUrl, fetcher, {
    onError: () => setIsError(),
  });

  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher);
  const { data: oppfolging } = useSWRImmutable(oppfolgingUrl, fetcher);

  const isUnderOppfolging = oppfolging?.underOppfolging;
  const isStandardInnsats = arbeidssoker?.erArbeidssoker && arbeidssoker?.erStandard;

  const microfrontends = enabledMicrofrontends?.microfrontends.map((mf) => (
    <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
  ));

  const uniqueProduktConfigs = getUniqueProdukter();

  const hasProduktkort = uniqueProduktConfigs !== undefined && uniqueProduktConfigs.length > 0;
  const hasMicrofrontends = microfrontends !== undefined && microfrontends.length > 0;
  const hasMeldekort = featureToggles?.FlytteMeldekort && isMeldekortbruker(meldekortFraApi);

  if (!hasMicrofrontends && !hasProduktkort && !isUnderOppfolging && !isStandardInnsats && !hasMeldekort) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        {isStandardInnsats && <AiaStandardWrapper />}
        {hasMicrofrontends || hasProduktkort || isUnderOppfolging || hasMeldekort ? (
          <BodyShort as="h2" spacing>
            {produktText.oversiktTittel[language]}
          </BodyShort>
        ) : null}
        {hasMeldekort && (
          <div className={styles.meldekort}>
            <MeldekortWrapper />
          </div>
        )}
        <div className={styles.listeContainer}>
          <>{microfrontends}</>
          {isUnderOppfolging && <DialogVeileder />}
          {uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
