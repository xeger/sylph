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
const storage = browser.getMeta('application-storage');

// New resource base paths in query string
const baseRules = browser.getMetaN('application-query-base');
if (baseRules) {
  const newBases = baseRules
    .map(r => browser.applyQueryRule(window.location, r))
    .filter(b => b);
  if (newBases.length > 0) {
    bases = newBases;
    if (storage)
      localStorage.setItem(`${storage}.queryBase`, JSON.stringify(bases));
  }
}

// New resource base paths in local storage
if (storage) {
  const storedBases = localStorage.getItem(`${storage}.queryBase`);
  if (storedBases) bases = JSON.parse(storedBases);
}

// New resource root in query string
const rootRule = browser.getMeta('application-query-root');
if (rootRule) {
  const newRoot = browser.applyQueryRule(window.location, rootRule);
  if (newRoot != null) {
    root = newRoot;
    if (storage) localStorage.setItem(`${storage}.root`, JSON.stringify(bases));
  }
}

// New resource root in local storage
if (storage) {
  const storedRoot = localStorage.getItem(`${storage}.root`);
  if (storedRoot) root = JSON.parse(storedRoot);
}

// Kick off the main event.
const application = { bases, debug, files, root };
const app = new App({
  target: document.body,
  props: { application, author, description },
});

export default app;
