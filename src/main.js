import App from './App.svelte';
import * as browser from './browser';

// HTML spec metas
const author = browser.getMeta('author');
const description = browser.getMeta('description');

// Sylph custom metas (named using "application-" prefix for compliance.)
let bases = browser.getMetaN('application-bases', ['/']);
const debug = !!browser.getMeta('application-debug');
let files = browser.getMetaN('application-files', ['main.js']);
let root = browser.getMeta(
  'application-root',
  `${window.location.protocol}//${window.location.host}`
);

// Developer friendliness: allow config override rules to be specified
// in meta, resulting in some configuration being overridden by query
// parameters if present. Overrides are removed from query string
// once applied.
const baseRules = browser.getMetaN('application-query-base');
if (baseRules) {
  const newBases = baseRules
    .map(r => browser.applyQueryRule(window.location, r))
    .filter(b => b);
  if (newBases.length > 0) bases = newBases;
}
const rootRule = browser.getMeta('application-query-root');
if (rootRule) {
  const newRoot = browser.applyQueryRule(window.location, rootRule);
  if (newRoot != null) root = newRoot;
}

// Kick off the main event.
const application = { bases, debug, files, root };
const app = new App({
  target: document.body,
  props: { application, author, description },
});

export default app;
