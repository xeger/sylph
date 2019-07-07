import App from './App.svelte';

function meta(name) {
  const tag = document.head.querySelector(`meta[name~=${name}][content]`);
  if (tag) return tag.content;
  return null;
}

function metas(name) {
  let str = meta(name);
  if (str) return str.split(',');
  return [];
}

const author = meta('author');
const description = meta('description');
const files = metas('application-files');
const roots = metas('application-roots');

const app = new App({
  target: document.body,
  props: { author, description, files, roots },
});

export default app;
