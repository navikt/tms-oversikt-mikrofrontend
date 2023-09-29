import React from "react";
import ErrorBoundary from "../../ErrorBoundary";

const MicrofrontendWrapper = ({ manifestUrl }: { manifestUrl: string }) => {
  const Microfrontend = React.lazy(() => import(manifestUrl));
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary>
        <Microfrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MicrofrontendWrapper;
