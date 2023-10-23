import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { aiaCdnUrl, aiaManifestUrl } from "../../api/urls";
import { aiaStandardEntry, bundle } from "../../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import ContentLoader from "../loader/ContentLoader";

const AiaStandardWrapper = () => {
  const [manifest, isLoading] = useManifest(aiaManifestUrl);

  if (isLoading) {
    return null;
  }

  const AiaStandard = React.lazy(() => import(`${aiaCdnUrl}/${manifest[aiaStandardEntry][bundle]}`));

  console.log("AiaStandard");

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary>
        <AiaStandard />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AiaStandardWrapper;
