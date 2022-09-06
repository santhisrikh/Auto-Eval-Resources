import "cypress-localstorage-commands";
const data = require("../fixtures/example.json");

c4TestCase();

function c4TestCase() {
  data.forEach(({ username, submission_link: url, name }) => {
    describe("c4", () => {
      let acc_score = 0;

      beforeEach(() => {
        cy.restoreLocalStorage();
        Cypress.on("uncaught:exception", (err, runnable) => {
          return false;
        });
      });

      afterEach(() => {
        cy.saveLocalStorage();
      });

      if (url.charAt(url.length - 1) != "/") {
        url = url + "/";
      }

      it(`${username} check signup functionality`, () => {
        cy.visit(url);
        cy.get("#image").type(
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        );
        cy.get("#name").type("Pablo pandey");
        cy.get("#email").type("abc@ymail.com");
        cy.get("#country").select("China");
        cy.get("#submit").click();

        // Make sure after submitting the input fields become empty

        cy.get("#image").should("have.text", "");
        cy.get("#name").should("have.text", "");
        cy.get("#email").should("have.text", "");

        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`${username} check user is stored in local storage or not`, () => {
        cy.restoreLocalStorage();

        let data = JSON.parse(localStorage.getItem("user"));

        expect(data.name).to.equal("Pablo pandey");
        expect(data.email).to.equal("abc@ymail.com");
        expect(data.image).to.equal(
          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        );

        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`${username} Check for Navbar and sidebar on worldNews.html`, () => {
        cy.visit(`${url}worldNews.html`);
        cy.get("#navbar").children("#search").should("exist");
        cy.get("#in").should("exist");
        cy.get("#ch").should("exist");
        cy.get("#uk").should("exist");
        cy.get("#nz").should("exist");

        cy.get("#sidebar").should("exist");
        cy.get("#image")
          .should("have.attr", "src")
          .should(
            "include",
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          );
        cy.get("#name").should("exist");
        cy.get("#email").should("exist");
        cy.get("#country").should("exist");

        cy.wait(3000);

        cy.get("#news_container").children().should("have.length", 20);

        cy.then(() => {
          acc_score += 2;
        });
      });

      it(`${username} check search functionality and country links`, () => {
        cy.get("#search").type("twitter{enter}");
        cy.get("#news_container").children().should("have.length", 20);

        cy.get("#in").click();
        cy.get("#news_container").children().should("have.length", 19);

        cy.get("#nz").click();
        cy.get("#news_container").children().should("have.length", 18);
        cy.get(".news").first().click();

        cy.then(() => {
          acc_score += 2;
        });
      });

      it(`${username} Check navbar and sidebar on news.html`, () => {
        cy.get("#navbar").should("exist");
        cy.get("#home_link").should("exist");
        cy.get("#world_news_link").should("exist");

        cy.get("#sidebar").should("exist");
        cy.get("#image")
          .should("have.attr", "src")
          .should(
            "include",
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          );
        cy.get("#name").should("exist");
        cy.get("#email").should("exist");
        cy.get("#country").should("exist");

        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`${username} Check for detailed news div`, () => {
        cy.get("#show_news").should("exist");
        // The same news should be present which we clicked on
        cy.get("#show_news").children("h3").should("exist");
        cy.get("#show_news").children("h4").should("exist");
        cy.get("#show_news")
          .children("img")
          .should("have.attr", "src")
          .should(
            "include",
            "https://www.nzherald.co.nz/resizer/VohamTvvQHpJvldZdTU72glBTEY=/1200x675/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/PP42GTWBYYMNDEMSVT6ADEJHF4.jpg"
          );

        cy.then(() => {
          acc_score += 1;
        });
      });

      it(`${username} generate score`, () => {
        if (!url || url === "/") {
          acc_score = 0;
        } else if (acc_score === 0) {
          acc_score = 1;
        }
        console.log("final score:", acc_score);
        let result = {
          username,
          name,
          submission_link: url,
          marks: Math.ceil(acc_score),
        };
        result = JSON.stringify(result);
        cy.writeFile(
          "b18-c4/js201-c4.json",
          `\n${result},`,
          { flag: "a+" },
          (err) => {
            if (err) {
              console.error(err);
            }
          }
        );
       
      });
    });
  });
}
