export function propsStringify(object: Record<string, any>): string {
  const items = [];
  for (const [key, value] of Object.entries(object)) {
    if (isObjectOrFunction(value))
      throw new Error(`Cannot stringify ${value} to neo4j format`);
    if (hasSpace(key)) throw new Error(`Key "${key}" contains space`);

    const item = `${key}: ${JSON.stringify(value)}`;
    items.push(item);
  }
  return `{ ${items.join(', ')} }`;
}

function isObjectOrFunction(value: any): boolean {
  if (value != null && typeof value === 'object') return true;
  return typeof value === 'function';
}

function hasSpace(value: string): boolean {
  return / /.test(value);
}
