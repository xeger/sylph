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

  describe('using alternate root', () => {
    it('reapplies persisted rule', () => {
      cy.visit('/?ui.local');
      cy.contains('Sorry');
      cy.visit('/?ui=foo');
      cy.contains('Sorry');
      cy.window().then(win => win.sessionStorage.clear());
      cy.reload();
      cy.contains('normal app');
    });
  });
});
