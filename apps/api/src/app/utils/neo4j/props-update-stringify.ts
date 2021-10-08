import { hasSpace, isObjectOrFunction } from './props-stringify';

export function propsUpdateStringify(
  variable: string,
  object: Record<string, any>,
): string {
  const items = [];
  for (const [key, value] of Object.entries(object)) {
    if (isObjectOrFunction(value))
      throw new Error(`Cannot stringify ${value} to create assignment`);
    if (hasSpace(key)) throw new Error(`Key "${key}" contains space`);

    const item = `${variable}.${key} = ${JSON.stringify(value)}`;
    items.push(item);
  }
  return `${items.join(', ')}`;
}
