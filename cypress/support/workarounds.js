// state that allows us to work around
// https://github.com/cypress-io/cypress/issues/1719
//
// lets us clear session storage on the first window load after
// every test commences (but hopefully not during other loads!)
var workaroundCypress1719 = false;

Cypress.on('test:before:run', () => {
  workaroundCypress1719 = true;
});

Cypress.on('window:before:load', win => {
  if (workaroundCypress1719) {
    win.sessionStorage.clear();
    workaroundCypress1719 = false;
  }
});
