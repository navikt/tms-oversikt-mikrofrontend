import { BodyShort } from "@navikt/ds-react";
import React, { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import {
  aapBaseCdnUrl,
  aapManifestUrl,
  mineSakerSakstemaerUrl,
  selectorUrl,
  syfoDialogCdnUrl,
  syfoDialogManifestUrl,
} from "../../api/urls";
import { aapEntry, bundle, syfoDialogEntry } from "../../entrypoints";
import ErrorBoundary from "../../ErrorBoundary";
import { useManifest } from "../../hooks/useManifest";
import { LanguageContext } from "../../language/LanguageProvider";
import { logEvent } from "../../utils/amplitude";
import ContentLoader from "../loader/ContentLoader";
import { getProduktConfigMap } from "../produktkort/ProduktConfig";
import { produktText } from "../produktkort/ProduktText";
import Produktkort from "../produktkort/Produktkort";
import styles from "./DinOversikt.module.css";
import { setIsError } from "../../store/store";

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

const DinOversikt = () => {
  const language = useContext(LanguageContext);

  const { data: profil, isLoading: isLoadingProfil } = useSWRImmutable(selectorUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => data.microfrontends.map((id: string) => logEvent(`minside.${id}`, true)),
  });
  const uniqueProduktConfigs = getUniqueProdukter();

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [syfoDialogManifest, isLoadingSyfoDialogManifest] = useManifest(syfoDialogManifestUrl);

  if (isLoadingProfil || isLoadingAapManifest || isLoadingSyfoDialogManifest) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isSyfoDialogBruker = profil?.microfrontends.includes("syfo-dialog");

  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
  const SyfoDialog = React.lazy(() => import(`${syfoDialogCdnUrl}/${syfoDialogManifest[syfoDialogEntry][bundle]}`));

  if (!isAapBruker && !isSyfoDialogBruker && (uniqueProduktConfigs === undefined || uniqueProduktConfigs?.length === 0)) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing="true">
          {produktText.oversiktTittel[language]}
        </BodyShort>
        <div className={styles.listeContainer}>
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
          </React.Suspense>
          {uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
