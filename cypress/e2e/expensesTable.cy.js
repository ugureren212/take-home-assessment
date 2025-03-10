describe("ExpensesTable Component loads data", () => {
  beforeEach(() => {
    // Intercept the API call and stub a successful response
    cy.intercept(
      "GET",
      "https://tip-transactions.vercel.app/api/transactions?page=1",
      {
        statusCode: 200,
        body: {
          transactions: [
            {
              id: 1,
              date: "2023-03-10T00:00:00Z",
              amount: 50.0,
              merchant: "Amazon",
              category: "Shopping",
            },
            {
              id: 2,
              date: "2023-03-11T00:00:00Z",
              amount: 20.0,
              merchant: "Starbucks",
              category: "Food",
            },
          ],
        },
      }
    ).as("getTransactions");

    cy.visit("/expenses");
  });

  it("renders transactions after loading", () => {
    cy.wait("@getTransactions");

    cy.get(".expenses-table").within(() => {
      // We expect 2 rows based on our stubbed response.
      cy.get("tbody tr").should("have.length", 2);
      cy.contains("Amazon");
      cy.contains("Starbucks");
    });
  });
});
