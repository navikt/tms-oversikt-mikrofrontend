const isProduction = window.location.href.includes("www.nav.no");
const isDevelopment = window.location.href.includes("www.intern.dev.nav.no");

//TODO: bruk getEnvironment fra urls

const getEnvironment = () => {
  if (isProduction) {
    return "production";
  }

  if (isDevelopment) {
    return "development";
  }
  return "local";
};

const produktlinkerDev = {
  dagpenger: {
    nb: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
    nn: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
    en: "https://arbeid.intern.dev.nav.no/arbeid/dagpenger/mine-dagpenger",
  }
};

const produktlinkerProd = {
  dagpenger: {
    nb: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    nn: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
    en: "https://www.nav.no/arbeid/dagpenger/mine-dagpenger",
  }
};
const produktlinkConfig = {
  local: produktlinkerDev,
  development: produktlinkerDev,
  production: produktlinkerProd,
};

export const produktlinker = produktlinkConfig[getEnvironment()];
