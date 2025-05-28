/* global cy, describe, it */

/// <reference types="cypress" />

describe('Startsidan / Home', () => {

  it('visar rubriken "Senaste blogginlägg"', () => {
    cy.visit('/');
    cy.contains('Senaste blogginlägg').should('exist');
  });

  it('visar minst ett inlägg med titel och länk', () => {
    cy.visit('/');

    //kollar att minst ett inlägg finns
    cy.get('.post-card').should('have.length.greaterThan', 0);

    //kontrollerar att titeln syns och att länken går till ett inlägg
    cy.get('.post-card a').first().should('have.attr', 'href').and('include', '/post/');
  });

});
