describe('resource root URL', () => {
  it('configured via sylph-root', () => {
    cy.visit('/');
    cy.contains('normal app');
    cy.get('meta[name="sylph-root"]').should(
      'have.attr',
      'content',
      '/fixtures'
    );
  });

  describe('root query rule', () => {
    it('overrides when present', () => {
      cy.visit('/?ui.local');
      cy.contains('Sorry');
    });

    it('persists after reload', () => {
      cy.visit('/?ui.local');
      cy.contains('Sorry');
      cy.reload();
      cy.contains('Sorry');
    });
  });
});
