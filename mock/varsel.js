export default [
  {
    url: "/tms-varsel-api/antall/aktive",
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
