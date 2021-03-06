/// <reference types="cypress" />

context("Help sidebar", () => {
  before(() => cy.pytchExactlyOneProject());

  it("starts with sidebar hidden", () => {
    cy.get(".help-sidebar .content-wrapper").should("not.be.visible");
  });

  const openSidebar = () => {
    cy.get(".help-sidebar .content-wrapper").should("not.be.visible");
    cy.get(".help-sidebar .control").click();
    cy.get(".help-sidebar .content-wrapper").should("be.visible");
  };

  const closeSidebar = () => {
    cy.get(".help-sidebar .content-wrapper").should("be.visible");
    cy.get(".help-sidebar .dismiss-help").click();
    cy.get(".help-sidebar .content-wrapper").should("not.be.visible");
  };

  it("allows user to open/close sidebar", () => {
    openSidebar();
    closeSidebar();
  });

  it("has content in sidebar", () => {
    openSidebar();
    cy.get(".help-sidebar .inner-content").contains("all_instances");
    closeSidebar();
  });

  it("allows help text to be shown", () => {
    openSidebar();
    cy.contains("self.backdrop_number")
      .parentsUntil(".pytch-method")
      .parent()
      .within(() => {
        cy.get(".help-button").click();
        cy.contains("Python counts list entries");
        cy.get(".help-button").click();
      });
    closeSidebar();
  });
});
