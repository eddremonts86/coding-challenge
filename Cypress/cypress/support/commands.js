// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('login', (user = 'eddremonts86@gmail.com', passw = 'eddremonts86') => {    
    cy.visit('');
    cy.get("[data-cy=cy-login]").click();
    cy.get(".card-header").should("be.visible").should("contain", "Login");
    cy.get("#email", { timeout: 100 }).type(user);
    cy.get("#password").type(passw);
    cy.get("[data-cy=cy-login]").click();
    cy.get("[data-cy=cy-projects]")
      .should("be.visible")
      .should("contain", "Projects");
})