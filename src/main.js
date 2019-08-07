import App from './App.svelte';
import * as browser from './browser';

// HTML spec metas
const author = browser.getMeta('author');
const description = browser.getMeta('description');

// Sylph custom metas (named using "application-" prefix for compliance.)
const assetQuery = browser.getMeta('application-asset-query');
let bases = browser.getMetaN('application-bases', ['/']);
const debug = !!browser.getMeta('application-debug');
let files = browser.getMetaN('application-files', ['main.js']);
let root = browser.getMeta(
  'application-root',
  `${window.location.protocol}//${window.location.host}`
);

const targetSel = browser.getMeta('application-target');

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
    if (storage) localStorage.setItem(`${storage}.root`, JSON.stringify(root));
  }
}

// New resource root in local storage
if (storage) {
  const storedRoot = localStorage.getItem(`${storage}.root`);
  if (storedRoot) root = JSON.parse(storedRoot);
}

// Rig self-destruct to politely remove svelte from DOM
let app;
function onDone() {
  try {
    app.$destroy();
  } catch (err) {
    // ignored (app may have taken over the target)
  }
}

// Kick off the main event.
const application = { assetQuery, bases, debug, files, root };
const target = targetSel ? document.querySelector(targetSel) : document.body;
app = new App({
  intro: true,
  target,
  props: { application, author, description, onDone },
});

export default app;
