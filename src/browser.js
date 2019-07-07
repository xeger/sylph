/**
 * If the named parameter is present in location.query, remove it
 * and return its value. Leave the rest of the query string undisturbed.
 */
export function consumeQuery(location, name) {
  const { search } = location;
  const pattern = new RegExp(`(\\?|&)${name}=(.+?)(&|$)`);
  const result = search.match(pattern);

  if (result) {
    const updatedURL = [
      window.location.origin,
      window.location.pathname,
      search.replace(result[0], result[3] && result[1]),
    ].join('');
    window.history.replaceState({}, null, updatedURL);

    return result[2];
  }

  return null;
}

/**
 * Create an HTML tag that will load src when it is added to the DOM.
 * Src can be a .css file (style tag) or any other file (script tag).
 */
export function createTag(src) {
  let tag;

  if (src.slice(-4) === '.css') {
    tag = document.createElement('style');
    tag.textContent = '@import "' + src + '"';
  } else {
    tag = document.createElement('script');
    tag.src = src;
    tag.crossOrigin = 'anonymous';
  }

  return tag;
}

/**
 * Return the string content of a meta tag, or null if undefined.
 */
export function getMeta(name) {
  const tag = document.head.querySelector(`meta[name~=${name}][content]`);
  if (tag) return tag.content;
  return null;
}

/**
 * Return an array with the comma-separated pieces of a meta tag's
 * content, or empty array if undefined/blank.
 */
export function getMetaN(name) {
  let str = getMeta(name);
  if (str) return str.split(',');
  return [];
}

/**
 * Asynchronously load a script or CSS resource by adding it to
 * the DOM. Return a promise that resolves to src or rejects
 * with an error.
 */
export function loadContent(src) {
  return new Promise((resolve, reject) => {
    let tag;

    if (src.endsWith('.css')) {
      tag = document.createElement('style');
      tag.textContent = '@import "' + src + '"';
    } else {
      tag = document.createElement('script');
      tag.src = src;
      tag.crossOrigin = 'anonymous';
    }

    tag.addEventListener('error', () => {
      tag.remove();
      reject(src);
    });
    tag.addEventListener('load', () => resolve(src));

    document.body.appendChild(tag);
  });
}

/**
 * Remove all elements matching selector from the DOM.
 */
export function removeAll(selector) {
  let el;
  do {
    el = document.body.querySelector(selector);
    if (el) el.remove();
  } while (el);
}
