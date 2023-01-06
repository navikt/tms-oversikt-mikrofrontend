const isProduction = window.location.href.includes("www.intern.nav.no") || window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.dev.nav.no");

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

const DITTNAV_API_URL = {
  local: "http://localhost:3000/dittnav-api",
  development: "https://www.dev.nav.no/dittnav-api",
  production: "https://www.nav.no/dittnav-api",
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
  local: "http://localhost:3000/api/endpoint/digisos/utkast/antall",
  development: "https://www.dev.nav.no/dittnav-api/digisos/utkast/antall",
  production: "https://www.nav.no/dittnav-api/digisos/utkast/antall",
};

export const apiUrl = API_URL[getEnvironment()];
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const dittNavApiUrl = DITTNAV_API_URL[getEnvironment()];
export const minSideProxyUrl = MIN_SIDE_PROXY_URL[getEnvironment()];
export const digisosUtkastApiUrl = DIGISOS_UTKAST_API_URL[getEnvironment()];

export const antallUtkastUrl = `${minSideProxyUrl}/utkast/utkast/antall`;
export const minSideUtkastUrl = `${minSideUrl}/utkast`;

export const oppgaverApiUrl = `${dittNavApiUrl}/oppgave`;
export const beskjederApiUrl = `${dittNavApiUrl}/beskjed`;

export const minSideVarslingerUrl = `${minSideUrl}/varslinger`;

export const identUrl = `${minSideProxyUrl}/personalia/ident`;
export const navnUrl = `${minSideProxyUrl}/personalia/navn`;
