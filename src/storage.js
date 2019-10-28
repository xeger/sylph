let storage = null;

function load(key) {
  storage = JSON.parse(window.sessionStorage.getItem(key)) || {};
}

/**
 * Read a value from local storage.
 * If key is undefined, do nothing and return undefined.
 */
export function get(key, subkey) {
  if (!key) return undefined;
  if (!storage) load(key);
  return storage[subkey];
}

/**
 * Update a value in memory, but not (yet) in storage.
 * To persist updates, call commit after all updates have
 * been made.
 * If key is undefined, do nothing and return undefined.
 */
export function set(key, subkey, value) {
  if (!key) return;
  if (!storage) load(key);
  storage[subkey] = value;
}

/**
 * Persist updates to local storage with one atomic write.
 */
export function commit(key) {
  if (key && storage)
    window.sessionStorage.setItem(key, JSON.stringify(storage));
}

/**
 * Remove persisted state from local storage.
 */
export function reset(key) {
  window.sessionStorage.removeItem(key);
}
