const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 500,
  e2e: {
    setupNodeEvents(on, config) {
      // https://github.com/bahmutov/cypress-failed-log
      require("cypress-failed-log/on")(on);
    },
  },
});
