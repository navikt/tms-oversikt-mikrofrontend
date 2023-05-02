const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }
  return "local";
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.intern.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const AAP_BASE_URL = {
  local: "http://localhost:3000/aap",
  development: "https://www.intern.dev.nav.no/aap/aap-min-side-microfrontend",
  production: "https://www.nav.no/aap/aap-min-side-microfrontend",
};

const AAP_BASE_CDN_URL = {
  local: "http://localhost:3000/aap",
  development: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
  production: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/er-arbeidssoker",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/aia/aia-backend/er-arbeidssoker",
  production: "https://www.nav.no/aia-backend/er-arbeidssoker",
};

const AIA_BASE_URL = {
  local: "http://localhost:3000/aia",
  development: "https://veientilarbeid.intern.dev.nav.no/esm",
  production: "https://veientilarbeid.nav.no/esm",
};

const AIA_BASE_CDN_URL = {
  local: "http://localhost:3000/aia",
  development: "https://cdn.nav.no/paw/aia",
  production: "https://cdn.nav.no/paw/aia",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  development: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/selector/mikrofrontends",
  production: "https://www.nav.no/tms-min-side-proxy/selector/mikrofrontends",
};

const OPPFOLGING_URL = {
  local: "http://localhost:3000/api/oppfolging",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/oppfolging",
  production: "https://www.nav.no/tms-min-side-proxy/oppfolging",
};

const STILLINGER_URL = {
  local: "http://localhost:3000/stillinger",
  development: "https://arbeidsplassen.nav.no/stillinger",
  production: "https://arbeidsplassen.nav.no/stillinger",
};

const UFORETRYGD_URL = {
  local: "http://localhost:3000/uforetrygd",
  development: `https://pensjon-pselv-q2-gcp.dev.nav.no/pselv/publisering/uforetrygd.jsf?context=ut`,
  production: `https://www.nav.no/pselv/publisering/uforetrygd.jsf?context=ut`,
};

const FORELDREPENGER_URL = {
  local: "http://localhost:3000/forelrepenger",
  development: "https://foreldrepenger.nav.no",
  production: "https://foreldrepenger.nav.no",
};

const AKTIVITETSPLAN_URL = {
  local: "http://localhost:3000/aktivitetsplan",
  development: "https://aktivitetsplan.dev.nav.no",
  production: "https://aktivitetsplan.nav.no",
};

const MELDEKORT_INFO_URL = {
  local: "http://localhost:3000/meldekort",
  development: "https://www.intern.dev.nav.no/meldekort/om-meldekort",
  production: "https://www.nav.no/meldekort/om-meldekort",
};

const PERSONOPPLYSNINGER_URL = {
  local: "http://localhost:3000/personopplysninger",
  development: "https://www.intern.dev.nav.no/person/personopplysninger",
  production: "https://www.nav.no/person/personopplysninger",
};

const SJEMAER_URL = {
  local: "http://localhost:3000/soknader",
  development: "https://www.intern.dev.nav.no/soknader",
  production: "https://www.nav.no/soknader",
};

const PENSJON_URL = {
  local: "http://localhost:3000/pensjon",
  development: "https://pensjon-pselv-q2-gcp.dev.nav.no/pselv",
  production: "https://www.nav.no/pselv",
};

const STILLINGSOK_URL = {
  local: "http://localhost:3000/stillingsok",
  development: "https://stillingsok.nav.no/pam-stillingsok/lagrede-sok",
  production: "https://stillingsok.nav.no/pam-stillingsok/lagrede-sok",
};

const ARBEID_URL = {
  local: "http://localhost:3000/arbeid",
  development: "https://www.intern.dev.nav.no/arbeid",
  production: "https://www.nav.no/arbeid",
};

const ARBEIDSSOKER_REGISTRERING_URL = {
  local: "http://localhost:3000/arbeidssokerregistrering",
  development: "https://arbeidssokerregistrering-q.nav.no",
  production: "https://arbeidssokerregistrering.nav.no",
};

const SOSIALHJELP_URL = {
  local: "http://localhost:3000/sosialhjelp",
  development: "https://www.intern.dev.nav.no/sosialhjelp/innsyn",
  production: "https://www.nav.no/sosialhjelp/innsyn",
};

const FULLMAKTER_URL = {
  local: "http://localhost:3000/fullmakter",
  development: "https://www.intern.dev.nav.no/person/pdl-fullmakt-ui",
  production: "https://www.nav.no/person/pdl-fullmakt-ui",
};

const PLEIEPENGER_URL = {
  local: "http://localhost:3000/pleiepenger",
  development: "https://sif-innsyn.dev.nav.no/familie/sykdom-i-familien/soknad/innsyn",
  production: "https://www.nav.no/familie/sykdom-i-familien/soknad/innsyn",
};

const SYKEFRAVAER_URL = {
  local: "http://localhost:3000/sykefravaer",
  development: "https://www-gcp.dev.nav.no/syk/sykefravaer",
  production: "https://www.nav.no/syk/sykefravaer",
};

const HJELPEMIDLER_URL = {
  local: "http://localhost:3000/oppfolging",
  development: "https://hjelpemidler.dev.nav.no/hjelpemidler/dinehjelpemidler",
  production: "https://www.nav.no/hjelpemidler/dinehjelpemidler",
};

const NAV_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://www.nav.no",
};

const PERSON_NAV_URL = {
  local: "http://localhost:3000",
  development: "https://person.dev.nav.no",
  production: "https://person.nav.no",
};

const DITTNAV_API_URL = {
  local: "http://localhost:3000/dittnav-api",
  development: "https://www.intern.dev.nav.no/dittnav-api",
  production: "https://www.nav.no/dittnav-api",
};

const MINE_SAKER_API_URL = {
  local: "http://localhost:3000/dittnav-api",
  development: "https://www.intern.dev.nav.no/mine-saker-api/siste",
  production: "https://person.nav.no/mine-saker-api/siste",
};

const TJENESTER_URL = {
  local: "http://localhost:3000/tjenester",
  development: "https://tjenester.dev.nav.no",
  production: "https://tjenester.nav.no",
};

const UTBETALINGSOVERSIKT_URL = {
  local: "http://localhost:3000/utbetalingsoversikt",
  development: "https://www.intern.dev.nav.no/utbetalingsoversikt",
  production: "https://tjenester.nav.no/utbetalingsoversikt",
};

const INNBOKS_URL = {
  local: "http://localhost:3000/innboks",
  development: "https://innboks.dev.nav.no",
  production: "https://innboks.nav.no",
};

const ARBEIDSAVKLARINGSPENGER_URL = {
  local: "http://localhost:3000/aap#kort",
  development: "https://aap-innsyn.dev.nav.no/aap/mine-aap/",
  production: "https://www.nav.no/aap/mine-aap",
};

const SYFO_DIALOG_BASE_URL = {
  local: "http://localhost:3000/syfo-dialog",
  development: "https://www.intern.dev.nav.no/dialogmote-mikrofrontend",
  production: "https://www.nav.no/dialogmote-mikrofrontend",
};

const SYFO_DIALOG_CDN_URL = {
  local: "http://localhost:3000/syfo-dialog",
  development: "https://cdn.nav.no/team-esyfo/dialogmote-mikrofrontend/dist",
  production: "https://cdn.nav.no/team-esyfo/dialogmote-mikrofrontend/dist",
};

export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const aapBaseCdnUrl = AAP_BASE_CDN_URL[getEnvironment()];
export const aapManifestUrl = `${AAP_BASE_URL[getEnvironment()]}/manifest.json`;
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironment()];
export const aiaBaseCdnUrl = AIA_BASE_CDN_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_BASE_URL[getEnvironment()]}/manifest.json`;
export const syfoDialogManifestUrl = `${SYFO_DIALOG_BASE_URL[getEnvironment()]}/manifest.json`;
export const syfoDialogCdnUrl = SYFO_DIALOG_CDN_URL[getEnvironment()];
export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const selectorUrl = SELECTOR_URL[getEnvironment()];
export const digisosAntallUtkastUrl = `${minSideProxyUrl}/utkast/utkast/digisos/antall`;
export const antallUtkastUrl = `${minSideProxyUrl}/utkast/utkast/antall`;
export const minSideUtkastUrl = `${minSideUrl}/utkast`;
export const antallVarslerUrl = `${minSideProxyUrl}/varsel/tms-varsel-api/antall/aktive`;
export const minSideVarslerUrl = `${minSideUrl}/varsler`;
export const identUrl = `${minSideProxyUrl}/personalia/ident`;
export const navnUrl = `${minSideProxyUrl}/personalia/navn`;

export const oppfolgingUrl = OPPFOLGING_URL[getEnvironment()];
export const stillingerUrl = STILLINGER_URL[getEnvironment()];
export const uforetrygdUrl = UFORETRYGD_URL[getEnvironment()];
export const foreldrepengerUrl = FORELDREPENGER_URL[getEnvironment()];
export const aktivitetsplanUrl = AKTIVITETSPLAN_URL[getEnvironment()];
export const meldekortInfoUrl = MELDEKORT_INFO_URL[getEnvironment()];
export const personopplysningerUrl = PERSONOPPLYSNINGER_URL[getEnvironment()];
export const skjemaerUrl = SJEMAER_URL[getEnvironment()];
export const pensjonUrl = PENSJON_URL[getEnvironment()];
export const stillingsokUrl = STILLINGSOK_URL[getEnvironment()];
export const arbeidUrl = ARBEID_URL[getEnvironment()];
export const arbeidssokerRegistreringUrl = ARBEIDSSOKER_REGISTRERING_URL[getEnvironment()];
export const sosialhjelpUrl = SOSIALHJELP_URL[getEnvironment()];
export const fullmakterUrl = FULLMAKTER_URL[getEnvironment()];
export const pleiepengerUrl = PLEIEPENGER_URL[getEnvironment()];
export const sykefravaerUrl = SYKEFRAVAER_URL[getEnvironment()];
export const hjelpemidlerUrl = HJELPEMIDLER_URL[getEnvironment()];
export const navUrl = NAV_URL[getEnvironment()];
export const personNavUrl = PERSON_NAV_URL[getEnvironment()];
export const tjenesterUrl = TJENESTER_URL[getEnvironment()];
export const innboksUrl = INNBOKS_URL[getEnvironment()];
export const arbeidsavklaringspengerUrl = ARBEIDSAVKLARINGSPENGER_URL[getEnvironment()];
export const utbetalingsoversiktUrl = UTBETALINGSOVERSIKT_URL[getEnvironment()];
export const mineSakerApiUrl = MINE_SAKER_API_URL[getEnvironment()];

export const dialogMedVeilederUrl = `${navUrl}/arbeid/dialog`;
export const mineSakerUrl = `${personNavUrl}/mine-saker`;
export const soknadUrl = `${navUrl}/soknader`;
export const dinPensjonUrl = `${tjenesterUrl}/pselv/publisering/dinpensjon.jsf`;
