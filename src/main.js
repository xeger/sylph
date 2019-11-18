import App from './App.svelte';
import * as browser from './browser';
import * as storage from './storage';
import * as transform from './transform';

// HTML spec metas;
const author = browser.getMeta('author');
const description = browser.getMeta('description');

// Sylph custom metas.
const assetQueryRule = browser.getMeta('sylph-xf-root-asset-query');
const baseRules = browser.getMetaN('sylph-xf-query-base');
const contactEmail = browser.getMeta('sylph-contact-email');
const contactPhone = browser.getMeta('sylph-contact-phone');
const debug = !!browser.getMeta('sylph-debug');
const errorImage = browser.getMeta('sylph-error-image');
const rootRule = browser.getMeta('sylph-xf-query-root');
const splashImage = browser.getMeta('sylph-splash-image');
const storageKey = browser.getMeta('sylph-storage');
const targetSel = browser.getMeta('sylph-target');
const transportSecurity = browser.getMeta('sylph-transport-security');

const { location } = window;
let assetQuery = null;
let hasOverrides = false;
let bases = browser.getMetaN('sylph-bases', ['/']);
let files = browser.getMetaN('sylph-files', ['main.js']);
let root = browser.getMeta(
  'sylph-root',
  `${location.protocol}//${location.host}`
);

if (baseRules) {
  const newBases = baseRules
    .map(r => transform.applyQueryRule(r, browser.readQuery))
    .filter(b => b !== null);
  if (newBases.length > 0) {
    hasOverrides = true;
    bases = newBases;
  }
}

if (rootRule) {
  const newRoot = transform.applyQueryRule(rootRule, browser.readQuery);
  if (newRoot != null) {
    hasOverrides = true;
    root = newRoot;
  }
}

if (assetQueryRule) {
  assetQuery = transform.applyRule(root, assetQueryRule);
}

if (hasOverrides) {
  // Remember overrides for later
  storage.set(storageKey, 'bases', bases);
  storage.set(storageKey, 'root', root);
} else {
  // Recall overrides
  const sb = storage.get(storageKey, 'bases');
  const sr = storage.get(storageKey, 'root');
  bases = sb || bases;
  root = sr || root;
  hasOverrides = !!(sb || sr);
}

// Get rid of query string gunk
if (baseRules)
  baseRules.forEach(r => transform.cleanupQueryRule(r, browser.consumeQuery));
if (rootRule) transform.cleanupQueryRule(rootRule, browser.consumeQuery);

// Rig self-destruct to politely remove svelte from DOM
let app;
function onDone() {
  try {
    app.$destroy();
  } catch (err) {
    // ignored (app may have taken over the target)
  }
}

// Persist all changes.
storage.commit(storageKey);

// Kick off the main event.
const application = {
  assetQuery,
  bases,
  contactEmail,
  contactPhone,
  debug,
  errorImage,
  files,
  root,
  splashImage,
  transportSecurity,
};
const target = targetSel ? document.querySelector(targetSel) : document.body;
app = new App({
  intro: true,
  target,
  props: { allowReset: hasOverrides, application, author, description, onDone },
});

export default app;
