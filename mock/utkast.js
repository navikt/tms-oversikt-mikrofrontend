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
    url: "/tms-min-side-proxy/utkast/utkast/digisos/antall",
    method: "get",
    response: () => {
      return {
        antall: 3,
      };
    },
  },
];
