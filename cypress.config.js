// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   defaultCommandTimeout: 500,
//   e2e: {
//     setupNodeEvents(on, config) {
//       // https://github.com/bahmutov/cypress-failed-log
//       require("cypress-failed-log/on")(on);
//     },
//   },
// });
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  failOnStatusCode: false,
  screenshotOnRunFailure: true,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config);
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});
