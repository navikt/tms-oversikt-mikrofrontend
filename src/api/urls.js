const isProduction = window.location.href.includes("www.intern.nav.no") || window.location.href.includes("www.nav.no");
const isDevelopment =
  window.location.href.includes("www.dev.nav.no") || window.location.href.includes("www.intern.dev.nav.no");

export const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }
  return "local";
};

const API_URL = {
  development: "http://localhost:3000/api/endpoint",
  production: "https://person.nav.no/api/endpoint",
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const DIGISOS_UTKAST_API_URL = {
  local: "http://localhost:3000/dittnav-api/digisos/utkast/antall",
  development: "https://www.dev.nav.no/dittnav-api/digisos/utkast/antall",
  production: "https://www.nav.no/dittnav-api/digisos/utkast/antall",
};

const AAP_BASE_URL = {
  local: "http://localhost:3000/aap",
  development: "https://www.dev.nav.no/aap/aap-min-side-microfrontend",
  production: "https://www.nav.no/aap/aap-min-side-microfrontend",
};

const AAP_BASE_CDN_URL = {
  local: "http://localhost:3000/aap",
  development: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
  production: "https://cdn.nav.no/aap/aap-min-side-microfrontend/dist",
};

const ARBEIDSSOKER_URL = {
  local: "http://localhost:3000/er-arbeidssoker",
  development: "https://www.intern.dev.nav.no/aia-backend/er-arbeidssoker",
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
  development: "https://www.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  development: "https://www.dev.nav.no/tms-min-side-proxy/selector/mikrofrontends",
  production: "https://www.nav.no/tms-min-side-proxy/selector/mikrofrontends",
};

export const apiUrl = API_URL[getEnvironment()];
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const digisosUtkastApiUrl = DIGISOS_UTKAST_API_URL[getEnvironment()];
export const aapBaseCdnUrl = AAP_BASE_CDN_URL[getEnvironment()];
export const aapManifestUrl = `${AAP_BASE_URL[getEnvironment()]}/manifest.json`;
export const arbeidssokerUrl = ARBEIDSSOKER_URL[getEnvironment()];
export const aiaBaseCdnUrl = AIA_BASE_CDN_URL[getEnvironment()];
export const aiaManifestUrl = `${AIA_BASE_URL[getEnvironment()]}/manifest.json`;
export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const selectorUrl = SELECTOR_URL[getEnvironment()];
export const antallUtkastUrl = `${minSideProxyUrl}/utkast/utkast/antall`;
export const minSideUtkastUrl = `${minSideUrl}/utkast`;
export const antallVarslerUrl = `${minSideProxyUrl}/varsel/tms-varsel-api/antall/aktive`;
export const minSideVarslerUrl = `${minSideUrl}/varsler`;
export const identUrl = `${minSideProxyUrl}/personalia/ident`;
export const navnUrl = `${minSideProxyUrl}/personalia/navn`;
