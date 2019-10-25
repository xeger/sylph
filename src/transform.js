import * as browser from './browser';

/**
 * Test value to see if it matches the rule; if so, apply the
 * specified rewrite rule to derive a new value for some configuration
 * parameter. If no match, return undefined.
 *
 * The rule is a mapping e.g. `foo=>*bar`, which is read as "if value
 * contains `foo`, then return the original value followed by `bar`."
 * (The wildcard is optional; `foo=>bar` would return `bar` and ignore the
 * original value.)
 */
export function applyRule(value, rule) {
  const [match, transform] = rule.split('=>', 2);
  if (value.includes(match)) return transform.replace('*', value);
}

/**
 * Detect a configuration override in the query string; if present,
 * and apply the specified rewrite rule to derive a new value for
 * some configuration parameter. Remove the matching QS parameter
 * (if found) before returning.
 *
 * The rule is a mapping e.g. `foo=>bar*` which is read as "if
 * the query string contains foo=something, return `barsomething`.
 * (The wildcard is optional; `foo=>bar` would return `bar` and
 * ignore the value of the query string parameter.)
 */
export function applyQueryRule(location, rule) {
  const [paramName, transform] = rule.split('=>', 2);

  const value = browser.consumeQuery(location, paramName);
  if (value === null) return null;
  return transform.replace('*', value);
}
