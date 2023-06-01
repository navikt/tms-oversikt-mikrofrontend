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
  {
    url: "/mine-saker-api/sakstemaer",
    method: "get",
    response: () => {
      return [
        { kode: "DAG" },
        { kode: "AAP" },
        { kode: "FOR" },
        { kode: "HJE" },
        { kode: "KOM" },
        { kode: "PEN" },
        { kode: "OMS" },
        { kode: "SYK" },
        { kode: "SYM" },
        { kode: "UFO" },
        { kode: "UKJENT" },
      ];
    },
  },
];
