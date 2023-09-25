import React from "react";
import ErrorBoundary from "../../ErrorBoundary";

export interface EnabledMicrofrontend {
  microfrontend_id: string;
  url: string;
}

export interface EnabledMicrofrontends {
  microfrontends: EnabledMicrofrontend[];
  offerStepup: boolean;
}

export const MicrofrontendWrapper = ({ manifestUrl }: { manifestUrl: string }) => {
  const Microfrontend = React.lazy(() => import(manifestUrl));
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary>
        <Microfrontend />
      </ErrorBoundary>
    </React.Suspense>
  );
};
