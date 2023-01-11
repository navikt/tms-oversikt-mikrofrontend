export default [
  {
    url: "/api/endpoint",
    method: "get",
    response: () => {
      return {
        tekst: "Dette kommer til å bli en awesome mikrofrontend! 😊 🎉",
      };
    },
  },
  {
    url: "/tms-min-side-proxy/utkast/utkast/antall",
    method: "get",
    response: () => {
      return {
        antall: 2,
      };
    },
  },
  {
    url: "/dittnav-api/digisos/utkast/antall",
    method: "get",
    response: () => {
      return {
        antall: 3,
      };
    },
  },
  {
    url: "/dittnav-api/varsel/antall",
    method: "get",
    response: () => {
      return {
        oppgaver: 3,
        beskjeder: 2,
        innbokser: 4,
      };
    },
  },
];
