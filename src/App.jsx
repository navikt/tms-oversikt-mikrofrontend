import React, { useState } from "react";
import Sidetittel from "./components/sidetittel/Sidetittel";
import Oppgaver from "./components/oppgaver/Oppgaver";
import Utkast from "./components/utkast/Utkast";
import { aapBaseCdnUrl, aapManifestUrl, aiaBaseCdnUrl, arbeidssokerUrl, meldekortUrl } from "./api/urls";
import { aiaManifestUrl, oppfolgingUrl, selectorUrl, syfoDialogManifestUrl, syfoDialogCdnUrl } from "./api/urls";
import ContentLoader from "./components/loader/ContentLoader";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "./api/api";
import { useManifest } from "./hooks/useManifest";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import { aapEntry, aiaEntry, bundle, syfoDialogEntry } from "./entrypoints";
import Feilmelding from "./components/feilmelding/Feilmelding";
import { logEvent } from "./utils/amplitude";
import Utbetaling from "./components/utbetaling/Utbetaling";
import KommunikasjonsFlis from "./components/kommunikasjonsflis/KommunikasjonsFlis";
import SisteSakerPanel from "./components/siste-saker-panel/SisteSakerPanel";
import InnloggedeTjenester from "./components/innloggede-tjenester/InnloggedeTjenester";
import style from "./App.module.css";
import ProduktkortListe from "./components/produktkort/ProduktkortListe";
import DinOversikt from "./components/din-oversikt/DinOversikt";

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
