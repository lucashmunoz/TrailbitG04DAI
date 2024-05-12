module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  env: {
    es6: true
  }
};
