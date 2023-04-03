export default [
  {
    url: "/tms-min-side-proxy/personalia/navn",
    method: "get",
    response: () => {
      return {
        navn: "Navn navnesen",
      };
    },
  },
  {
    url: "/tms-min-side-proxy/personalia/ident",
    method: "get",
    response: () => {
      return {
        navn: "123",
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
