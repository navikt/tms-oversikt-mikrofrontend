import { getEnvironment } from "../utils/getEnvironment";

const MIN_SIDE_PROXY_URL = {
  local: "http://localhost:3000/tms-min-side-proxy",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy",
  production: "https://www.nav.no/tms-min-side-proxy",
};

const ARBEIDSSOKER_BASE_URL = {
  local: "http://localhost:3000/registrert-arbeidssoker",
  development: "https://www.intern.dev.nav.no/arbeidssoker-mikrofrontend",
  production: "https://www.nav.no/arbeidssoker-mikrofrontend",
};

const ARBEIDSSOKER_BASE_CDN_URL = {
  local: "http://localhost:3000/arbeidssoker-mikrofrontend",
  development: "https://cdn.nav.no/min-side/arbeidssoker-mikrofrontend/dist",
  production: "https://cdn.nav.no/min-side/arbeidssoker-mikrofrontend/dist",
};

const MELDEKORT_URL = {
  local: "http://localhost:3000/meldekort/bundle.js",
  development: "https://www.intern.dev.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
  production: "https://www.nav.no/meldekort-mikrofrontend/meldekort-mikrofrontend.js",
};

const SELECTOR_URL = {
  local: "http://localhost:3000/selector",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/selector",
  production: "https://www.nav.no/tms-min-side-proxy/selector",
};

const OPPFOLGING_URL = {
  local: "http://localhost:3000/api/oppfolging",
  development: "https://www.intern.dev.nav.no/tms-min-side-proxy/oppfolging",
  production: "https://www.nav.no/tms-min-side-proxy/oppfolging",
};

const NAV_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://www.nav.no",
};

const PERSON_NAV_URL = {
  local: "http://localhost:3000",
  development: "https://www.intern.dev.nav.no",
  production: "https://person.nav.no",
};

const MINE_SAKER_SAKSTEMAER_URL = {
  local: "http://localhost:3000/mine-saker-api/sakstemaer/egne",
  development: "https://www.intern.dev.nav.no/mine-saker-api/sakstemaer/egne",
  production: "https://person.nav.no/mine-saker-api/sakstemaer/egne",
};

const INNBOKS_URL = {
  local: "http://localhost:3000/innboks",
  development: "https://innboks.dev.nav.no",
  production: "https://innboks.nav.no",
};

const TMS_VARSEL_API = {
  local: "http://localhost:3000/tms-varsel-api/",
  development: "https://www.intern.dev.nav.no/tms-varsel-api",
  production: "https://www.nav.no/tms-varsel-api",
};

export const arbeidssokerBaseCdnUrl = ARBEIDSSOKER_BASE_CDN_URL[getEnvironment()];
export const arbeidssokerManifestUrl = `${ARBEIDSSOKER_BASE_URL[getEnvironment()]}/manifest.json`;
export const meldekortUrl = MELDEKORT_URL[getEnvironment()];
export const microfrontendsUrl = `${SELECTOR_URL[getEnvironment()]}/microfrontends`;
export const antallVarslerUrl = `${TMS_VARSEL_API[getEnvironment()]}/antall/aktive`;
export const oppfolgingUrl = OPPFOLGING_URL[getEnvironment()];
export const innboksUrl = INNBOKS_URL[getEnvironment()];
export const mineSakerSakstemaerUrl = MINE_SAKER_SAKSTEMAER_URL[getEnvironment()];
export const featureToggleUrl = `${MIN_SIDE_PROXY_URL[getEnvironment()]}/featuretoggles`;
export const dialogMedVeilederUrl = `${NAV_URL[getEnvironment()]}/arbeid/dialog`;
