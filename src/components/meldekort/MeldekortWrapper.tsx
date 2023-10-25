import React from "react";
import ErrorBoundary from "../../ErrorBoundary";
import { meldekortUrl } from "../../api/urls";

const MeldekortWrapper = () => {
  const Meldekort = React.lazy(() => import(meldekortUrl));
  return (
    <React.Suspense fallback={null}>
      <ErrorBoundary>
        <Meldekort />
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default MeldekortWrapper;
