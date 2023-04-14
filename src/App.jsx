import React, { useState } from "react";
import Sidetittel from "./components/sidetittel/Sidetittel";
import Oppgaver from "./components/oppgaver/Oppgaver";
import Utkast from "./components/utkast/Utkast";
import style from "./App.module.css";
import "@navikt/ds-css";
import { aapBaseCdnUrl, aapManifestUrl, aiaBaseCdnUrl } from "./api/urls";
import { aiaManifestUrl, arbeidssokerUrl, meldekortUrl, selectorUrl } from "./api/urls";
import ContentLoader from "./components/loader/ContentLoader";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "./api/api";
import { useManifest } from "./hooks/useManifest";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import { aapEntry, aiaEntry, bundle } from "./entrypoints";
import Feilmelding from "./components/feilmelding/Feilmelding";
import { logEvent } from "./amplitude";

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

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);

  if (isLoadingProfil || isLoadingAiaManifest || isLoadingAapManifest) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(() =>
    import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
  );

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
      </React.Suspense>
    </div>
  );
}

export default App;
