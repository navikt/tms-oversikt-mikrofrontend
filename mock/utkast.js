export default [
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
];
