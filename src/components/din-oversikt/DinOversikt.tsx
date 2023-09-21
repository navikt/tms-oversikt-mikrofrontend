import { BodyShort } from "@navikt/ds-react";
import React, { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import ErrorBoundary from "../../ErrorBoundary";
import { fetcher } from "../../api/api";
import {
  aapBaseCdnUrl,
  aapManifestUrl,
  microfrontendsUrl,
  mineSakerSakstemaerUrl,
  selectorUrl,
  syfoAktivitetskravCdnUrl,
  syfoAktivitetskravManifestUrl,
  syfoDialogCdnUrl,
  syfoDialogManifestUrl,
} from "../../api/urls";
import { aapEntry, bundle, entry, syfoDialogEntry } from "../../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import { LanguageContext } from "../../language/LanguageProvider";
import { setIsError } from "../../store/store";
import { logEvent } from "../../utils/amplitude";
import DialogVeileder from "../dialog-veileder/DialogVeileder";
import ContentLoader from "../loader/ContentLoader";
import { getProduktConfigMap } from "../produktkort/ProduktConfig";
import { produktText } from "../produktkort/ProduktText";
import Produktkort from "../produktkort/Produktkort";
import styles from "./DinOversikt.module.css";
import { EnabledMicrofrontends, MicrofrontendWrapper } from "./microfrontendTypes";

type Sakstemaer = Array<{ kode: string }>;

const getUniqueProdukter = () => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const produktConfigMap = getProduktConfigMap();

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index
  );

  return uniqueProduktConfigs;
};

const DinOversikt = ({
  isOppfolging,
  enableServiceDiscovery,
}: {
  isOppfolging: boolean;
  enableServiceDiscovery: boolean | undefined;
}) => {
  const language = useContext(LanguageContext);

  const { data: profil, isLoading: isLoadingProfil } = useSWRImmutable(selectorUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => data.microfrontends.map((id: string) => logEvent(`minside.${id}`, true)),
  });

  const { data: enabledMicrofrontends } = useSWRImmutable<EnabledMicrofrontends>(microfrontendsUrl, fetcher, {
    //onError: () => setIsError(),
    //onSuccess: (data) => data.microfrontends.map((mf) => logEvent(`minside.${mf.microfrontend_id}`, true)),
  });

  const microfrontends = enabledMicrofrontends?.microfrontends.map((mf) => (
    <MicrofrontendWrapper manifestUrl={mf.url} key={mf.microfrontend_id} />
  ));

  const uniqueProduktConfigs = getUniqueProdukter();

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [syfoDialogManifest, isLoadingSyfoDialogManifest] = useManifest(syfoDialogManifestUrl);
  const [syfoAktivitetskravManifest, isLoadingSyfoAktivitetskravManifest] = useManifest(syfoAktivitetskravManifestUrl);

  if (isLoadingProfil || isLoadingAapManifest || isLoadingSyfoDialogManifest || isLoadingSyfoAktivitetskravManifest) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isSyfoDialogBruker = profil?.microfrontends.includes("syfo-dialog");
  const isSyfoAktivitetBruker = profil?.microfrontends.includes("syfo-aktivitetskrav");

  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
  const SyfoDialog = React.lazy(() => import(`${syfoDialogCdnUrl}/${syfoDialogManifest[syfoDialogEntry][bundle]}`));
  const SyfoAktivitetskrav = React.lazy(
    () => import(`${syfoAktivitetskravCdnUrl}/${syfoAktivitetskravManifest[entry][bundle]}`)
  );

  if (
    !isAapBruker &&
    !isSyfoDialogBruker &&
    !isSyfoAktivitetBruker &&
    !isOppfolging &&
    (uniqueProduktConfigs === undefined || uniqueProduktConfigs?.length === 0)
  ) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing>
          {produktText.oversiktTittel[language]}
        </BodyShort>
        <div className={styles.listeContainer}>
          {enableServiceDiscovery ? (
            <>{microfrontends}</>
          ) : (
            <React.Suspense fallback={<ContentLoader />}>
              {isAapBruker && (
                <ErrorBoundary>
                  <Arbeidsavklaringspenger />
                </ErrorBoundary>
              )}
              {isSyfoDialogBruker && (
                <ErrorBoundary>
                  <SyfoDialog />
                </ErrorBoundary>
              )}
              {isSyfoAktivitetBruker && (
                <ErrorBoundary>
                  <SyfoAktivitetskrav />
                </ErrorBoundary>
              )}
            </React.Suspense>
          )}
          {isOppfolging && <DialogVeileder />}
          {uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
