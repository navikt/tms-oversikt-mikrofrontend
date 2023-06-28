import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";
import style from "./App.module.css";
import { fetcher } from "./api/api";
import { aiaBaseCdnUrl, aiaManifestUrl, arbeidssokerUrl, meldekortUrl, oppfolgingUrl } from "./api/urls";
import DinOversikt from "./components/din-oversikt/DinOversikt";
import Feilmelding from "./components/feilmelding/Feilmelding";
import InnloggedeTjenester from "./components/innloggede-tjenester/InnloggedeTjenester";
import KommunikasjonsFlis from "./components/kommunikasjonsflis/KommunikasjonsFlis";
import ContentLoader from "./components/loader/ContentLoader";
import Oppgaver from "./components/oppgaver/Oppgaver";
import Sidetittel from "./components/sidetittel/Sidetittel";
import SisteSakerPanel from "./components/siste-saker-panel/SisteSakerPanel";
import Utbetaling from "./components/utbetaling/Utbetaling";
import Utkast from "./components/utkast/Utkast";
import { aiaEntry, bundle } from "./entrypoints";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import { useManifest } from "./hooks/useManifest";
import { logEvent } from "./utils/amplitude";

function App() {
  const [isError, setIsError] = useState(false);
  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher, {
    onError: () => setIsError(true),
    onSuccess: (data) => logEvent("minside.aia", data.erArbeidssoker),
  });

  const { data } = useSWRImmutable(oppfolgingUrl, fetcher);
  const brukerUnderOppfolging = data?.underOppfolging;

  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);

  if (isLoadingAiaManifest) {
    return <ContentLoader />;
  }

  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

  const Meldekort = React.lazy(() => import(meldekortUrl));

  return (
    <div className={style.app}>
      {isError ? <Feilmelding /> : null}
      <div className={style.pageWrapper}>
        <Sidetittel />
      </div>
      <div className={style.panelWrapper}>
        <Oppgaver />
        <Utkast />
      </div>
      <React.Suspense fallback={<ContentLoader />}>
        <ErrorBoundary setIsError={setIsError}>
          <Meldekort />
        </ErrorBoundary>
        {isArbeidssoker ? (
          <ErrorBoundary setIsError={setIsError}>
            <ArbeidsflateForInnloggetArbeidssoker />
          </ErrorBoundary>
        ) : null}
      </React.Suspense>
      <div className={style.page_wrapper_microfrontend}>
        <div className="min-side-lenkepanel">
          <div className={brukerUnderOppfolging ? style.lenkepanel_stor_wrapper : style.lenkepanel_liten_wrapper}>
            <Utbetaling size={brukerUnderOppfolging ? "large" : "small"} />
            <KommunikasjonsFlis size={brukerUnderOppfolging ? "large" : "small"} />
          </div>
          <DinOversikt setIsError={setIsError} />

          <div className={style.sisteSakerWrapper}>
            <SisteSakerPanel />
          </div>
        </div>
        <InnloggedeTjenester />
      </div>
    </div>
  );
}

export default App;
