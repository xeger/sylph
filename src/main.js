import App from './App.svelte';
import * as browser from './browser';
import * as storage from './storage';
import * as transform from './transform';
import * as util from './util';

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

let assetQuery = null;
let hasOverrides = false;
let bases = browser.getMetaN('sylph-bases', ['/']);
let files = browser.getMetaN('sylph-files', ['main.js']);
let root = browser.getMeta(
  'sylph-root',
  `${window.location.protocol}//${window.location.host}`
);

if (baseRules) {
  const newBases = baseRules
    .map(r => transform.applyQueryRule(window.location, r))
    .filter(b => b);
  if (newBases.length > 0) {
    debugger;
    hasOverrides = true;
    bases = newBases;
  }
}

if (rootRule) {
  const newRoot = transform.applyQueryRule(window.location, rootRule);
  if (newRoot != null) {
    debugger;
    hasOverrides = true;
    root = newRoot;
    storage.set(storageKey, 'root', root);
  }
}

if (assetQueryRule) {
  assetQuery = transform.applyRule(root, assetQueryRule);
}

if (hasOverrides) {
  // Remember settings for later
  storage.set(storageKey, 'bases', bases);
  storage.set(storageKey, 'root', root);
} else {
  // Load remembered settings (if any)
  const sb = storage.get(storageKey, 'bases');
  const sr = storage.get(storageKey, 'root');
  bases = sb || bases;
  root = sr || root;
  hasOverrides = !!(sb || sr);
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
