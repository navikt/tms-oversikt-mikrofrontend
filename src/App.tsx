import { useStore } from "@nanostores/react";
import { Alert, Link } from "@navikt/ds-react";
import React from "react";
import useSWRImmutable from "swr/immutable";
import style from "./App.module.css";
import ErrorBoundary from "./ErrorBoundary";
import { fetcher } from "./api/api";
import { arbeidssokerUrl, featureToggleUrl, meldekortUrl, oppfolgingUrl } from "./api/urls";
import AiaWrapper from "./components/aia/AiaWrapper";
import DinOversikt from "./components/din-oversikt/DinOversikt";
import Feilmelding from "./components/feilmelding/Feilmelding";
import Innboks from "./components/innboks/Innboks";
import ContentLoader from "./components/loader/ContentLoader";
import SisteSakerPanel from "./components/siste-saker-panel/SisteSakerPanel";
import Utbetaling from "./components/utbetaling/Utbetaling";
import { isErrorAtom, setIsError } from "./store/store";
import { logEvent } from "./utils/amplitude";
import { FeatureToggles } from "./utils/featuretoggles";

function App() {
  const isError = useStore(isErrorAtom);

  useSWRImmutable<FeatureToggles>(featureToggleUrl, fetcher);

  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => logEvent("minside.aia", data.erArbeidssoker),
  });
  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const { data } = useSWRImmutable(oppfolgingUrl, fetcher);
  const brukerUnderOppfolging = data?.underOppfolging;

  const Meldekort = React.lazy(() => import(meldekortUrl));

  return (
    <div className={style.app}>
      {isError ? <Feilmelding /> : null}
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary>
          <Meldekort />
        </ErrorBoundary>
      </React.Suspense>
      <div className={style.page_wrapper_microfrontend}>
        <div className="min-side-lenkepanel">
          <DinOversikt isOppfolging={brukerUnderOppfolging} />
          <Utbetaling />
          <Innboks />
          <div className={style.sisteSakerWrapper}>
            <SisteSakerPanel />
          </div>
        </div>
      </div>
      {isArbeidssoker ? <AiaWrapper /> : null}
    </div>
  );
}

export default App;
