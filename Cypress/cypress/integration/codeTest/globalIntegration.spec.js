/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("Going to loging page", () => {
    cy.get("[data-cy=cy-login]").click();
    cy.get(".card-header").should("be.visible").should("contain", "Login");
  });

  it("Login into the system", () => {
    cy.get("[data-cy=cy-login]").click();
    cy.get("#email", { timeout: 1000 }).type("eddremonts86@gmail.com");
    cy.get("#password").type("passwordtest");
    cy.get("[data-cy=cy-login]").click();
    cy.get(".invalid-feedback").should("be.visible");
    cy.login();
  });

  it("Add project", () => {
    cy.login();
    cy.get("[data-cy=cy-addProject]").click();
    cy.get("[data-cy=cy-projectAddProjectButtonCancel]").click();
    cy.get("[data-cy=cy-addProject]").click();
    cy.get("[data-cy=cy-projectName]").type("Cypres-Text");
    cy.get("[data-cy=cy-projectAddProjectButtonSave]").click();
    cy.get(".swal2-confirm").click();
    cy.get("[data-cy=cy-projects]")
      .should("be.visible")
      .should("contain", "Projects");
    cy.get("td", { timeout: 1000 }).should("contain", "Cypres-Text");
  });
  it("Modificate project", () => {
    cy.login();
    cy.get("table", { timeout: 1000 })
      .contains("td", "Cypres-Text")
      .should("be.visible");
    cy.get("table")
      .contains("td", "Cypres-Text")
      .then((elem) => {
        elem.click();
        cy.get("[data-cy=cy-EditProject]").clear().type("Cypres-Text");
        cy.get(".alert").should("be.visible");
        cy.get("[data-cy=cy-EditProject]").clear().type("Cypres-Text-edited");
        cy.get("[data-cy=cy-projectEditProjectSave]").click();
        cy.get(".swal2-confirm").click();
        cy.get("[data-cy=cy-projects]")
          .should("be.visible")
          .should("contain", "Projects");
        cy.get("td", { timeout: 1000 }).should("contain", "Cypres-Text-edited");
      });
  });
  it("Delete project", () => {
    cy.login();
    cy.get("table", { timeout: 1000 })
      .contains("td", "Cypres-Text-edited")
      .should("be.visible");
      cy.get("[data-cy=cy-delete-Cypres-Text-edited]").click();
      cy.get(".swal2-cancel ").click();
      cy.get("[data-cy=cy-delete-Cypres-Text-edited]").click();
      cy.get(".swal2-confirm").click();
      cy.get(".swal2-confirm").click();
  });
});

 