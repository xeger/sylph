import App from './App.svelte';
import * as browser from './browser';

// HTML spec metas
const author = browser.getMeta('author');
const description = browser.getMeta('description');

// Sylph custom metas
const bases = browser.getMetaN('application-bases', ['/']);
const files = browser.getMetaN('application-files', ['main.js']);
const root = browser.getMeta(
  'application-root',
  `${window.location.protocol}//${window.location.host}`
);
const application = { bases, files, root };

const app = new App({
  target: document.body,
  props: { application, author, description },
});

export default app;
