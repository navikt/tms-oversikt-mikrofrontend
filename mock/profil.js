export default [
  {
    url: "/selector",
    method: "get",
    response: () => {
      return { microfrontends: ["aap", "syfo-dialog"] };
    },
  },
];
