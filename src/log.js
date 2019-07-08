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
