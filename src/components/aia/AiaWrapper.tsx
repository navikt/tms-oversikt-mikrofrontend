import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { aiaBaseCdnUrl, aiaManifestUrl } from "../../api/urls";
import { aiaEntry, bundle } from "../../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ContentLoader from "../loader/ContentLoader";

const AiaWrapper = () => {
  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);

  if (isLoadingAiaManifest) {
    return null;
  }

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(
    () => import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <ArbeidsflateForInnloggetArbeidssoker />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AiaWrapper;
