import amplitude from "amplitude-js";

export const initializeAmplitude = () => {
  amplitude.getInstance().init("default", "", {
    apiEndpoint: "amplitude.nav.no/collect-auto",
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),
  });
};

export function logEvent(name: string, metric: any) {
  amplitude.getInstance().logEvent(name, {
    app: "tms-min-side",
    komponent: metric,
  });
}
export function logNavigereEvent(komponent: string, kategori: string, lenketekst: string) {
  amplitude.getInstance().logEvent("navigere", {
    app: "tms-min-side",
    komponent: komponent,
    kategori: kategori,
    lenketekst: lenketekst,
  });
}
