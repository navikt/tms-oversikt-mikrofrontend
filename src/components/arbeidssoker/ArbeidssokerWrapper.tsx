import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { arbeidssokerBaseCdnUrl, arbeidssokerManifestUrl } from "../../api/urls";
import { bundle, entry } from "../../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ContentLoader from "../loader/ContentLoader";

const ArbeidssokerWrapper = () => {
  const [arbeidssokerManifest, isLoadingArbeidssokerManifest] = useManifest(arbeidssokerManifestUrl);

  if (isLoadingArbeidssokerManifest) {
    return null;
  }

  const Arbeidssoker = React.lazy(() => import(`${arbeidssokerBaseCdnUrl}/${arbeidssokerManifest[entry][bundle]}`));

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <Arbeidssoker />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default ArbeidssokerWrapper;
