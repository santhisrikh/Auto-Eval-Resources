it(` Generate score`, () => {
  cy.task("readdir", "cypress/logs").then((files) => {
    files.forEach((file) => {
      cy.readFile(`cypress/logs/${file}`).then((res) =>
        cy.writeFile(
          "b18-c3-parttime/pt-web06-logs.json",
          `\n${JSON.stringify(res)},`,
          {
            flag: "a+",
          }
        )
      );
    });
  });
});
