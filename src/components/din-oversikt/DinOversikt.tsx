import { BodyShort } from "@navikt/ds-react";
import React, { useContext, useState } from "react";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "../../api/api";
import { aapBaseCdnUrl, aapManifestUrl, selectorUrl, syfoDialogCdnUrl, syfoDialogManifestUrl } from "../../api/urls";
import { aapEntry, bundle, syfoDialogEntry } from "../../entrypoints";
import ErrorBoundary from "../../error-boundary/ErrorBoundary";
import { useManifest } from "../../hooks/useManifest";
import { LanguageContext } from "../../language/LanguageProvider";
import { logEvent } from "../../utils/amplitude";
import ContentLoader from "../loader/ContentLoader";
import { produktText } from "../produktkort/ProduktText";
import styles from "./DinOversikt.module.css";


const DinOversikt = ({ setIsError }: { setIsError:  React.Dispatch<React.SetStateAction<boolean>> }) => {
  const language = useContext(LanguageContext);

  const { data: profil, isLoading: isLoadingProfil } = useSWRImmutable(selectorUrl, fetcher, {
    onError: () => setIsError(true),
    onSuccess: (data) => data.microfrontends.map((id: string) => logEvent(`minside.${id}`, true)),
  });

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [syfoDialogManifest, isLoadingSyfoDialogManifest] = useManifest(syfoDialogManifestUrl);

  if (isLoadingProfil || isLoadingAapManifest || isLoadingSyfoDialogManifest) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isSyfoDialogBruker = profil?.microfrontends.includes("syfo-dialog");

  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
  const SyfoDialog = React.lazy(() => import(`${syfoDialogCdnUrl}/${syfoDialogManifest[syfoDialogEntry][bundle]}`));

  return (
    <div className={styles.oversiktContainer}>
      <React.Suspense fallback={<ContentLoader />}>
        <BodyShort as="h2" spacing="true">
          {produktText.oversiktTittel[language]}
        </BodyShort>
        {isAapBruker && (
          <ErrorBoundary setIsError={setIsError}>
            <Arbeidsavklaringspenger />
          </ErrorBoundary>
        )}
        {isSyfoDialogBruker && (
          <ErrorBoundary setIsError={setIsError}>
            <SyfoDialog />
          </ErrorBoundary>
        )}
      </React.Suspense>
    </div>
  );
};

export default DinOversikt;
