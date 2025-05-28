/* global cy, describe, it */

describe('Enskilt inlägg / SinglePost', () => {

  it('visar ett inlägg när man besöker en slug', () => {
    //besöker ett specifikt inlägg
    cy.visit('/post/Soffa');

    //kontrollerar att titel visas
    cy.get('h1').should('exist');

    //kontrollerar att inläggstext eller body finns
    cy.get('article').should('contain.text');
  });

  it('visar tillbaka-länken längst ner', () => {
    cy.visit('/post/test-inlagg');
    cy.contains('← Tillbaka').should('have.attr', 'href', '/');
  });

});
