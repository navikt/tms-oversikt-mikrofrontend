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
    url: "/api/endpoint/utkast",
    method: "get",
    response: () => {
      return {
        antall: 2,
      };
    },
  },
];
