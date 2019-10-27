export function isEqual(a, b) {
  let same = true;
  const ta = typeof a;
  const tb = typeof b;

  if (ta === 'object' && ta === 'object')
    Object.keys(b).forEach(k => {
      same = same && isEqual(a[k], b[k]);
    });
  else if (ta === tb) same = a === b;
  else same = false;

  return same;
}
