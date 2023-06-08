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

function App() {
  const [isError, setIsError] = useState(false);
  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher, {
    onError: () => setIsError(true),
    onSuccess: (data) => logEvent("minside.aia", data.erArbeidssoker),
  });

  const { data: profil, isLoading: isLoadingProfil } = useSWRImmutable(selectorUrl, fetcher, {
    onError: () => setIsError(true),
    onSuccess: (data) => data.microfrontends.map((id) => logEvent(`minside.${id}`, true)),
  });

  const { data } = useSWRImmutable(oppfolgingUrl, fetcher);
  const brukerUnderOppfolging = data?.underOppfolging;

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);
  const [syfoDialogManifest, isLoadingSyfoDialogManifest] = useManifest(syfoDialogManifestUrl);

  if (isLoadingProfil || isLoadingAiaManifest || isLoadingAapManifest || isLoadingSyfoDialogManifest) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isSyfoDialogBruker = profil?.microfrontends.includes("syfo-dialog");
  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

  const SyfoDialog = React.lazy(() => import(`${syfoDialogCdnUrl}/${syfoDialogManifest[syfoDialogEntry][bundle]}`));
  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
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
        {isAapBruker ? (
          <ErrorBoundary setIsError={setIsError}>
            <Arbeidsavklaringspenger />
          </ErrorBoundary>
        ) : null}
        {isArbeidssoker ? (
          <ErrorBoundary setIsError={setIsError}>
            <ArbeidsflateForInnloggetArbeidssoker />
          </ErrorBoundary>
        ) : null}
        {isSyfoDialogBruker ? (
          <ErrorBoundary setIsError={setIsError}>
            <SyfoDialog />
          </ErrorBoundary>
        ) : null}
      </React.Suspense>
      <div className={style.page_wrapper_microfrontend}>
        <div className="min-side-lenkepanel">
          <div className={brukerUnderOppfolging ? style.lenkepanel_stor_wrapper : style.lenkepanel_liten_wrapper}>
            <Utbetaling size={brukerUnderOppfolging ? "large" : "small"} />
            <KommunikasjonsFlis size={brukerUnderOppfolging ? "large" : "small"} />
          </div>
          <ProduktkortListe />

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
