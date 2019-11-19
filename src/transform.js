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
 * some configuration parameter.
 *
 * The rule is a mapping e.g. `foo=>bar*` which is read as "if
 * the query string contains foo=something, return `barsomething`.
 * (The wildcard is optional; `foo=>bar` would return `bar` and
 * ignore the value of the query string parameter.)
 */
export function applyQueryRule(rule, readQuery) {
  const [paramName, transform] = rule.split('=>', 2);

  const value = readQuery(paramName);
  if (value === undefined) return undefined;
  return transform.replace('*', value);
}

/**
 * Remove the rule's parameter from the query string, if found.
 */
export function cleanupQueryRule(rule, consumeQuery) {
  const [paramName] = rule.split('=>', 2);
  consumeQuery(paramName);
}
