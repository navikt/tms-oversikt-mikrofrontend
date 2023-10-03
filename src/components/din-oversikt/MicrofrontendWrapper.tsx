import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { Skeleton } from "@navikt/ds-react";

const MicrofrontendWrapper = ({ manifestUrl }: { manifestUrl: string }) => {
  const Microfrontend = React.lazy(() => import(manifestUrl));
  return (
    <React.Suspense fallback={<Skeleton variant="rectangle" width={444} height={124} />}>
      <ErrorBoundary>
        <Microfrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MicrofrontendWrapper;
