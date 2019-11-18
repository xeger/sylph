import './commands';
import './workarounds';

Cypress.on('uncaught:exception', err => {
  // sirv-cli responds with index.html instead of 404 when something's not found.
  // not useful for testing (or for anything, really) but until we bother to
  // write our own sirv script, this is a handy workaround.
  if (err.message && err.message.includes("Unexpected token '<'")) return false;
});
