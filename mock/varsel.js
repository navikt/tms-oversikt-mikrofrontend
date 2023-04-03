export default [
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
