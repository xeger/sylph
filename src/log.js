let isDebug = false;

export function setDebug(d) {
  isDebug = d;
}

export function debug(...args) {
  if (isDebug) console.log('sylph:', ...args);
}

export function info(...args) {
  console.log('sylph:', ...args);
}

export function error(...args) {
  console.error('sylph:', ...args);
}
