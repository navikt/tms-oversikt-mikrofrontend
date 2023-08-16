import { useStore } from "@nanostores/react";
import React from "react";
import useSWRImmutable from "swr/immutable";
import style from "./App.module.css";
import ErrorBoundary from "./ErrorBoundary";
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
import LegacyUtbetaling from "./components/utbetaling/legacy/LegacyUtbetaling";
import Utbetaling from "./components/utbetaling/siste/Utbetaling";
import Utkast from "./components/utkast/Utkast";
import { aiaEntry, bundle } from "./entrypoints";
import { useManifest } from "./hooks/useManifest";
import { isErrorAtom, setIsError } from "./store/store";
import { logEvent } from "./utils/amplitude";

function App() {
  const isError = useStore(isErrorAtom);

  const enableAiaFlytting = import.meta.env.VITE_ENABLE_AIA_FLYTTING
  
  const { data: arbeidssoker } = useSWRImmutable(arbeidssokerUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => logEvent("minside.aia", data.erArbeidssoker),
  });

  const { data } = useSWRImmutable(oppfolgingUrl, fetcher);
  const brukerUnderOppfolging = data?.underOppfolging;

  const [aiaManifest, isLoadingAiaManifest] = useManifest(aiaManifestUrl);

  if (isLoadingAiaManifest) {
    return <ContentLoader />;
  }

  const isArbeidssoker = arbeidssoker?.erArbeidssoker;

  const ArbeidsflateForInnloggetArbeidssoker = React.lazy(
    () => import(`${aiaBaseCdnUrl}/${aiaManifest[aiaEntry][bundle]}`)
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
        <ErrorBoundary>
          <Meldekort />
        </ErrorBoundary>
        {enableAiaFlytting !== "true" && isArbeidssoker ? (
          <ErrorBoundary>
            <ArbeidsflateForInnloggetArbeidssoker />
          </ErrorBoundary>
        ) : null}
      </React.Suspense>
      <div className={style.page_wrapper_microfrontend}>
        <div className="min-side-lenkepanel">
          <div className={brukerUnderOppfolging ? style.lenkepanel_stor_wrapper : style.lenkepanel_liten_wrapper}>
            <LegacyUtbetaling size={brukerUnderOppfolging ? "large" : "small"} />
            <KommunikasjonsFlis size={brukerUnderOppfolging ? "large" : "small"} />
          </div>
          <DinOversikt isArbeidssoker={isArbeidssoker} />
          <Utbetaling />
          <div className={style.sisteSakerWrapper}>
            <SisteSakerPanel />
          </div>
        </div>
      </div>
      <React.Suspense fallback={<ContentLoader />}>
        {enableAiaFlytting === "true" && isArbeidssoker ? (
          <ErrorBoundary>
            <ArbeidsflateForInnloggetArbeidssoker />
          </ErrorBoundary>
        ) : null}
      </React.Suspense>
      <InnloggedeTjenester />
    </div>
  );
}

export default App;
