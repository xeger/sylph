import App from './App.svelte';
import * as browser from './browser';

const author = browser.getMeta('author');
const description = browser.getMeta('description');
const files = browser.getMetaN('application-files');
const roots = browser.getMetaN('application-roots');

const app = new App({
  target: document.body,
  props: { author, description, files, roots },
});

export default app;
