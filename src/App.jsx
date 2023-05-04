import React, { useContext, useState } from "react";
import Sidetittel from "./components/sidetittel/Sidetittel";
import Oppgaver from "./components/oppgaver/Oppgaver";
import Utkast from "./components/utkast/Utkast";
import { aapBaseCdnUrl, aapManifestUrl, aiaBaseCdnUrl, arbeidssokerUrl, meldekortUrl } from "./api/urls";
import { aiaManifestUrl, oppfolgingUrl, selectorUrl } from "./api/urls";
import ContentLoader from "./components/loader/ContentLoader";
import useSWRImmutable from "swr/immutable";
import { fetcher } from "./api/api";
import { useManifest } from "./hooks/useManifest";
import ErrorBoundary from "./error-boundary/ErrorBoundary";
import { aapEntry, aiaEntry, bundle } from "./entrypoints";
import Feilmelding from "./components/feilmelding/Feilmelding";
import { logEvent } from "./utils/amplitude";
import Utbetaling from "./components/utbetaling/Utbetaling";
import KommunikasjonsFlis from "./components/kommunikasjonsflis/KommunikasjonsFlis";
import SisteSakerPanel from "./components/siste-saker-panel/SisteSakerPanel";
import GenerelleFliser from "./components/generelle-fliser/GenerelleFliser";
import { Heading, Panel } from "@navikt/ds-react";
import Lenkeliste from "./components/Lenkeliste";
import { LanguageContext } from "./language/LanguageProvider";
import { generelleLenker, oppfolgingsLenker } from "./lenker";
import { text } from "./language/text";
import style from "./App.module.css";
import "@navikt/ds-css";
import InnloggedeTjenester from "./components/innloggede-tjenester/InnloggedeTjenester";

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
  const lenker = data?.erUnderOppfolging ? oppfolgingsLenker : generelleLenker;
  const brukerUnderOppfolging = data?.erUnderOppfolging;
  const language = useContext(LanguageContext);

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
      <section className={style.page_wrapper_microfrontend}>
        <section className="min-side-lenkepanel">
          <section className={brukerUnderOppfolging ? style.lenkepanel_stor_wrapper : style.lenkepanel_liten_wrapper}>
            <Utbetaling size={brukerUnderOppfolging ? "large" : "small"} />
            <KommunikasjonsFlis size={brukerUnderOppfolging ? "large" : "small"} />
          </section>
          <SisteSakerPanel />
        </section>
        {brukerUnderOppfolging ? null : <GenerelleFliser />}
        <InnloggedeTjenester />
      </section>
    </div>
  );
}

export default App;
