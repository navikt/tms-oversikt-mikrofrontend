//Legg inn regler som ikke skal kjøres før commit.

module.exports = {
  extends: [".eslintrc.js"],
  rules: {
    //TODO: enable rules
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "react/jsx-key": "warn",
  },
};
