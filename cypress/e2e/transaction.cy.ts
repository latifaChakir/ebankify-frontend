describe('Gestion des transactions E2E', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/transactions/all', {
      statusCode: 200,
      body: {
        transactionDTO: null,
        message: "All transactions found successfully",
        statusCode: 200,
        transactions: [
          {
            id: 14,
            type: "STANDARD",
            amount: 93.0,
            status: "PENDING",
            sourceAccount: {
              user: {
                name: "Shay Sellers",
              },
              accountNumber: "499",
            },
            destinationAccount: {
              user: {
                name: "Shay Sellers",
              },
              accountNumber: "499",
            },
            nextExecutionDate: null,
          }
        ],
      },
    }).as('getTransactions');

    cy.visit('/transactions');
  });

  it('doit afficher les transactions correctement', () => {
    cy.wait('@getTransactions').its('response.statusCode').should('eq', 200);

    cy.get('table tbody', { timeout: 10000 }).should('exist').and('be.visible');

    cy.get('table tbody')
      .find('tr')
      .should('have.length', 1);

    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('td').eq(1).should('contain', 'Shay Sellers');
        cy.get('td').eq(2).should('contain', 'Shay Sellers');
        cy.get('td').eq(3).should('contain', '93');
        cy.get('td').eq(4).should('contain', 'STANDARD');
        cy.get('td').eq(5).should('contain', 'PENDING');
        cy.get('td').eq(6).should('contain', '');
      });

  });

  it('doit afficher un message d\'erreur si les transactions échouent à charger', () => {
    cy.intercept('GET', '/api/transactions/all', {
      statusCode: 500,
      body: { error: 'Erreur lors du chargement des transactions' },
    }).as('getTransactionsError');

    cy.visit('/transactions');

    cy.wait('@getTransactionsError').its('response.statusCode').should('eq', 500);

    cy.get('.error-message')
      .should('be.visible')
      .and('contain', 'Erreur lors du chargement des transactions');
  });
  it('doit afficher un indicateur de chargement pendant le chargement des transactions', () => {
    cy.intercept('GET', '/api/transactions/all', {
      delay: 2000,
      body: [],
    }).as('getTransactionsDelayed');

    cy.visit('/transactions');

    cy.get('.loading-indicator').should('be.visible');

    cy.wait('@getTransactionsDelayed');

    cy.get('.loading-indicator').should('not.exist');
  });
});
