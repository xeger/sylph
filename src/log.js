const tag = '[sylph]';

let isDebug = false;

export function setDebug(d) {
  isDebug = d;
}

export function debug(...args) {
  if (isDebug) console.log(tag, ...args);
}

export function info(...args) {
  console.log(tag, ...args);
}

export function error(...args) {
  console.error(tag, ...args);
}

/**
 * Try to report an exception to a bug catcher. If successful, return
 * a reference ID; otherwise, return undefined. Log the error to the
 * console in any event.
 */
export function fatal(exception) {
  let id;

  // Report to Sentry using the unified SDK or (legacy) Raven SDK.
  // Capture the error ID if it was made available to us. Paranoia
  // checks are present so we work with a wide variety of SDK
  // versions.
  const sentry = window.Sentry || window.Raven;
  if (sentry && typeof sentry.captureException === 'function') {
    const hasTags = typeof sentry.setTagsContext === 'function';
    const hasId = typeof sentry.lastEventId === 'function';
    if (hasTags) sentry.setTagsContext({ sylph: true });
    sentry.captureException(exception);
    if (hasTags) sentry.setTagsContext({ sylph: false });
    if (hasId) id = sentry.lastEventId();
  }

  if (id) info(`(id=${id})`, exception);
  else error(exception);

  return id;
}
