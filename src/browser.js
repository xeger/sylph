/**
 * If the named parameter is present in location.query, remove it
 * and return its value. Leave the rest of the query string undisturbed.
 */
export function consumeQuery(location, name) {
  const { search } = location;
  const result = search.match(new RegExp(`(\\?|&)${name}(=.+)?(&|$)`));
  if (result) {
    const updatedURL = [
      window.location.origin,
      window.location.pathname,
      search.replace(result[0], result[3] && result[1]),
    ].join('');
    window.history.replaceState({}, null, updatedURL);

    return result[2] ? result[2].slice(1) : '';
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
 * Join path components, returning an absolute path with a leading slash,
 * no trailing slash, and exactly one slash between each component.
 */
export function joinPath(...components) {
  let result = components[0];

  components.slice(1).forEach(c => {
    const slash1 = result.endsWith('/');
    const slash2 = c.startsWith('/');
    if (!slash1 && !slash2) result = `${result}/${c}`;
    else if (slash1 && slash2) result = `${result}${c.slice(1)}`;
    else result = `${result}${c}`;
  });

  return result;
}

/**
 * Return the string content of a meta tag, or null if undefined.
 */
export function getMeta(name, def) {
  const tag = document.head.querySelector(`meta[name~=${name}][content]`);
  if (tag) return tag.content;
  return def;
}

/**
 * Return an array with the comma-separated pieces of a meta tag's
 * content, or empty array if undefined/blank.
 */
export function getMetaN(name, def) {
  let str = getMeta(name);
  if (str) return str.split(',');
  return def;
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

    let cleanup = () => true;
    const onError = () => {
      cleanup(false);
      reject(src);
    };
    const onLoad = () => {
      cleanup(true);
      resolve(src);
    };

    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onError);
    cleanup = success => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onError);
      if (!success) tag.remove();
    };
    tag.addEventListener('error', onError);
    tag.addEventListener('load', onLoad);

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

/**
 * Return true if the document base URI is https.
 */
export function hasSecureTransport() {
  return document.baseURI.startsWith('https:');
}

export function reloadSecurely() {
  const { host, pathname, search } = window.location;
  window.location = `https://${host}${pathname}${search}`;
}
