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
  if (window.Sentry) id = window.Sentry.captureException(exception);
  else if (window.Raven) id = window.Raven.captureException(exception);

  if (id) info(`(id=${id})`, exception);
  else error(exception);
}
