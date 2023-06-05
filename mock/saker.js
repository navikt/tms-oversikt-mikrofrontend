export default [
  {
    url: "/mine-saker-api/siste",
    method: "get",
    response: () => {
      return {
        sakstemaer: [
          {
            navn: "Serviceklager",
            kode: "SER",
            sistEndret: "2023-05-25T12:41:02Z",
            detaljvisningUrl: "https://www.intern.dev.nav.no/mine-saker/tema/SER",
          },
          {
            navn: "Arbeidsavklaringspenger",
            kode: "AAP",
            sistEndret: "2023-04-20T11:33:51Z",
            detaljvisningUrl: "https://aap-innsyn.dev.nav.no/aap/mine-aap",
          },
        ],
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
