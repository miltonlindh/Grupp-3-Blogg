/* global cy, describe, it */

describe('Kategorisidan', () => {

  it('visar listan med kategorier', () => {
    cy.visit('/category');

    //kolla att rubriken finns
    cy.contains('Kategorier');

    //vänta på att någon kategori laddas in 
    cy.get('.category-list .category-item').should('have.length.greaterThan', 0);
  });

  it('visar inlägg i en viss kategori när man klickar', () => {
    cy.visit('/category');

    //klickar på första kategorin i listan
    cy.get('.category-item').first().click();

    //vänta på att rubriken för kategorins inlägg visas
    cy.contains('Inlägg i kategori');

    //kontrollera att det finns minst ett inlägg
    cy.get('.category-list .category-item').should('have.length.greaterThan', 0);
  });

});
