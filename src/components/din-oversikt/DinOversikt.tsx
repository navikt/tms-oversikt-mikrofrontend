import { BodyShort } from "@navikt/ds-react";
import React, { useContext } from "react";
import useSWRImmutable from "swr/immutable";
import ErrorBoundary from "../../ErrorBoundary";
import { fetcher } from "../../api/api";
import {
  aapBaseCdnUrl,
  aapManifestUrl,
  mineSakerSakstemaerUrl,
  registrertArbeidssokerBaseCdnUrl,
  registrertArbeidssokerManifestUrl,
  selectorUrl,
  syfoDialogCdnUrl,
  syfoDialogManifestUrl,
} from "../../api/urls";
import { aapEntry, bundle, registrertArbeidssokerEntry, syfoDialogEntry } from "../../entrypoints";
import { useManifest } from "../../hooks/useManifest";
import { LanguageContext } from "../../language/LanguageProvider";
import { setIsError } from "../../store/store";
import { logEvent } from "../../utils/amplitude";
import DialogVeileder from "../dialog-veileder/DialogVeileder";
import ContentLoader from "../loader/ContentLoader";
import { getProduktConfigMap } from "../produktkort/ProduktConfig";
import { produktText } from "../produktkort/ProduktText";
import Produktkort from "../produktkort/Produktkort";
import styles from "./DinOversikt.module.css";

type Sakstemaer = Array<{ kode: string }>;

const getUniqueProdukter = () => {
  const { data: sakstemaer } = useSWRImmutable<Sakstemaer>(mineSakerSakstemaerUrl, fetcher);

  const produktConfigMap = getProduktConfigMap();

  const produktConfigs = sakstemaer
    ?.sort((a, b) => a.kode.localeCompare(b.kode))
    .map((sakstema) => produktConfigMap[sakstema.kode])
    .filter((produktConfig) => produktConfig != undefined);

  const uniqueProduktConfigs = produktConfigs?.filter(
    (produktConfig, index) => produktConfigs.findIndex((element) => element.tittel == produktConfig.tittel) === index
  );

  return uniqueProduktConfigs;
};

const DinOversikt = ({ isArbeidssoker, isOppfolging }: { isArbeidssoker: boolean; isOppfolging: boolean }) => {
  const language = useContext(LanguageContext);

  const { data: profil, isLoading: isLoadingProfil } = useSWRImmutable(selectorUrl, fetcher, {
    onError: () => setIsError(),
    onSuccess: (data) => data.microfrontends.map((id: string) => logEvent(`minside.${id}`, true)),
  });
  const uniqueProduktConfigs = getUniqueProdukter();

  const [aapManifest, isLoadingAapManifest] = useManifest(aapManifestUrl);
  const [syfoDialogManifest, isLoadingSyfoDialogManifest] = useManifest(syfoDialogManifestUrl);
  const [registretArbeidssokerManifest, isLoadingRegistrertArbeidssokerManifest] = useManifest(
    registrertArbeidssokerManifestUrl
  );

  if (
    isLoadingProfil ||
    isLoadingAapManifest ||
    isLoadingSyfoDialogManifest ||
    isLoadingRegistrertArbeidssokerManifest
  ) {
    return <ContentLoader />;
  }

  const isAapBruker = profil?.microfrontends.includes("aap");
  const isSyfoDialogBruker = profil?.microfrontends.includes("syfo-dialog");

  const Arbeidsavklaringspenger = React.lazy(() => import(`${aapBaseCdnUrl}/${aapManifest[aapEntry][bundle]}`));
  const SyfoDialog = React.lazy(() => import(`${syfoDialogCdnUrl}/${syfoDialogManifest[syfoDialogEntry][bundle]}`));
  const RegistrertArbeidssoker = React.lazy(
    () =>
      import(
        `${registrertArbeidssokerBaseCdnUrl}/${registretArbeidssokerManifest[registrertArbeidssokerEntry][bundle]}`
      )
  );

  if (
    !isAapBruker &&
    !isSyfoDialogBruker &&
    !isArbeidssoker &&
    !isOppfolging &&
    (uniqueProduktConfigs === undefined || uniqueProduktConfigs?.length === 0)
  ) {
    return null;
  } else {
    return (
      <div className={styles.oversiktContainer}>
        <BodyShort as="h2" spacing="true">
          {produktText.oversiktTittel[language]}
        </BodyShort>
        <div className={styles.listeContainer}>
          <React.Suspense fallback={<ContentLoader />}>
            {isArbeidssoker && (
              <ErrorBoundary>
                <RegistrertArbeidssoker />
              </ErrorBoundary>
            )}
            {isAapBruker && (
              <ErrorBoundary>
                <Arbeidsavklaringspenger />
              </ErrorBoundary>
            )}
            {isSyfoDialogBruker && (
              <ErrorBoundary>
                <SyfoDialog />
              </ErrorBoundary>
            )}
             {isOppfolging && (
              <ErrorBoundary>
                <DialogVeileder />
              </ErrorBoundary>
            )}
          </React.Suspense>
          {uniqueProduktConfigs?.map((produktConfig) => (
            <Produktkort produktConfig={produktConfig} key={produktConfig.tittel} />
          ))}
        </div>
      </div>
    );
  }
};

export default DinOversikt;
