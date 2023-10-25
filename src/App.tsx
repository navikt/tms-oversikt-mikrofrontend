import React from "react";
import { useStore } from "@nanostores/react";
import useSWRImmutable from "swr/immutable";
import style from "./App.module.css";
import ErrorBoundary from "./ErrorBoundary";
import { fetcher } from "./api/api";
import { featureToggleUrl, meldekortUrl } from "./api/urls";
import DinOversikt from "./components/din-oversikt/DinOversikt";
import Feilmelding from "./components/feilmelding/Feilmelding";
import Utbetaling from "./components/utbetaling/Utbetaling";
import { isErrorAtom } from "./store/store";
import { FeatureToggles } from "./utils/featuretoggles";

function App() {
  const { data: featureToggles } = useSWRImmutable<FeatureToggles>(featureToggleUrl, fetcher);
  const isError = useStore(isErrorAtom);

  const Meldekort = React.lazy(() => import(meldekortUrl));

  return (
    <div className={style.app}>
      {isError ? <Feilmelding /> : null}
      {!featureToggles?.FlytteMeldekort && (
        <React.Suspense fallback={null}>
          <ErrorBoundary>
            <Meldekort />
          </ErrorBoundary>
        </React.Suspense>
      )}
      <div className={style.page_wrapper_microfrontend}>
        <div className="min-side-lenkepanel">
          <DinOversikt />
          <Utbetaling />
        </div>
      </div>
    </div>
  );
}

export default App;
