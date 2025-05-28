/* global cy, describe, it */

describe('Admin-sidan', () => {
  it('ska visa inloggning och logga in korrekt', () => {
    cy.visit('http://localhost:5173/admin'); // Justera om din port är annorlunda

    // Kontrollera att lösenordsfältet visas
    cy.get('input[type="password"]').should('exist');

    // Fyll i lösenord och klicka på "Logga in"
    cy.get('input[type="password"]').type('hemligt');
    cy.contains('Logga in').click();

    // Kontrollera att adminpanelen visas
    cy.contains('Skapa nytt inlägg').should('exist');
  });

  it('ska kunna skriva in titel och slug i formuläret', () => {
    cy.visit('http://localhost:5173/admin');
    cy.get('input[type="password"]').type('hemligt');
    cy.contains('Logga in').click();

    // Fyll i fälten
    cy.get('input[placeholder="Titel"]').type('Testinlägg');
    cy.get('input[placeholder="Slug (url-namn)"]').type('testinlagg');

    // Kontrollera att dropdown för kategori finns
    cy.get('select').should('exist');
  });
});
