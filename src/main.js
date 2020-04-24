import App from './App.svelte';
import * as browser from './browser';
import * as log from './log';
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
let assetQuery = undefined;
let hasOverrides = false;
let base = browser.getMeta('sylph-base', '/');
let files = browser.getMetaN('sylph-files', ['main.js']);
let root = browser.getMeta(
  'sylph-root',
  `${location.protocol}//${location.host}`
);

function readQuery(name) {
  let value = browser.readQuery(name);
  if (value === undefined) {
    value = storage.get(storageKey, `query.${name}`);
  }
  return value;
}

function consumeQuery(name) {
  let value = browser.consumeQuery(name);
  if (value !== undefined) {
    storage.set(storageKey, `query.${name}`, value);
  }
  return value;
}

if (baseRules) {
  const newBase = baseRules
    .map(r => transform.applyQueryRule(r, readQuery))
    .find(b => b !== undefined);
  if (newBase != undefined) {
    hasOverrides = true;
    base = newBase;
  }
}

if (rootRule) {
  const newRoot = transform.applyQueryRule(rootRule, readQuery);
  if (newRoot != undefined) {
    hasOverrides = true;
    root = newRoot;
  }
}

if (assetQueryRule) {
  assetQuery = transform.applyRule(root, assetQueryRule);
}

// Get rid of query string gunk
if (baseRules)
  baseRules.forEach(r => transform.cleanupQueryRule(r, consumeQuery));
if (rootRule) transform.cleanupQueryRule(rootRule, consumeQuery);

// Rig self-destruct to politely remove svelte from DOM
let app;
function onDone() {
  try {
    log.debug('all done');
    app.$destroy();
  } catch (err) {
    // ignored (app may have taken over the target)
  }
}

// Persist all changes.
if (hasOverrides) {
  storage.set(storageKey, `actual.base`, base);
  storage.set(storageKey, `actual.root`, root);
}
storage.commit(storageKey);

// Kick off the main event.
const application = {
  assetQuery,
  base,
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
