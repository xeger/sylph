export function join(...components) {
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
