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
];
