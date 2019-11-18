describe('resource base path(s)', () => {
  it('configured via sylph-base', () => {
    cy.visit('/');
    cy.contains('normal app.');
    cy.get('meta[name="sylph-bases"]').should(
      'have.attr',
      'content',
      '/does-not-exist,/normal'
    );
  });

  describe('base query rule', () => {
    it('overrides with value', () => {
      cy.visit('/?ui=foo');
      cy.contains('foo app');
      cy.visit('/?ui=bar');
      cy.contains('bar app');
    });

    it('persists after reload', () => {
      cy.visit('/?ui=foo');
      cy.contains('foo app');
      cy.reload();
      cy.contains('foo app');
    });

    it('prompts to reset after failure', () => {
      cy.visit('/?ui=does-not-exist');
      cy.contains('Sorry');
      cy.contains('button', 'Reset Overrides').click();
      cy.contains('normal app');
    });
  });
});
