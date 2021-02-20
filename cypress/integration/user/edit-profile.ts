describe("Edit Profile", () => {
  beforeEach(() => {
    // @ts-ignore
    cy.login("test@test.com", "121212");
  });
  it("can go to /edit-profile using the header", () => {
    cy.get('a[href="/edit-profile"]').click();
    cy.wait(2000);
    cy.title().should("eq", "Edit Profile | Uber Eats Clone");
  });
  it("can change email", () => {
    cy.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body?.operationName === "editProfile") {
        // @ts-ignore
        req.body?.variables?.input?.email = "test@test.com";
      }
    });
    cy.visit("/edit-profile");
    cy.findByPlaceholderText(/email/i).clear().type("new@test.co");
    cy.findByRole("button").click();
  });
});
