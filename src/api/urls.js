function getEnvironment() {
  /* eslint-disable no-undef*/
  if (process.env.NODE_ENV === "production") {
    return "production";
  }
  return "development";
}

const API_URL = {
  development: "http://localhost:3000/api/endpoint",
  production: "https://person.nav.no/api/endpoint",
};

const DITTNAV_API_URL = {
  local: "http://localhost:3000/dittnav-api",
  development: "https://www.dev.nav.no/dittnav-api",
  production: "https://www.nav.no/dittnav-api",
};

const UTKAST_API_URL = {
  local: "http://localhost:3000/api/endpoint/utkast",
  development: "https://www.dev.nav.no/tms-min-side-proxy/utkast",
  production: "https://www.nav.no/tms-min-side-proxy/utkast",
};

const MIN_SIDE_URL = {
  local: "http://localhost:3000/minside",
  development: "https://www.dev.nav.no/minside",
  production: "https://www.nav.no/minside",
};

export const apiUrl = API_URL[getEnvironment()];
export const utkastApiUrl = UTKAST_API_URL[getEnvironment()];
export const minSideUrl = MIN_SIDE_URL[getEnvironment()];
export const dittNavApiUrl = DITTNAV_API_URL[getEnvironment()];

export const antallUtkastUrl = `${utkastApiUrl}/antall`;
export const minSideUtkastUrl = `${minSideUrl}/utkast`;

export const oppgaverApiUrl = `${dittNavApiUrl}/oppgave`;
export const beskjederApiUrl = `${dittNavApiUrl}/beskjed`;

export const minSideVarslingerUrl = `${minSideUrl}/varslinger`;
