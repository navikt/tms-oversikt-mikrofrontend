export default [
  {
    url: "/mine-saker-api/siste",
    method: "get",
    response: () => {
      return {
        sakstemaer: [],
        sakerURL: "https://www.dev.intern.nav.no/mine-saker",
        dagpengerSistEndret: null,
      };
    },
  },
];
