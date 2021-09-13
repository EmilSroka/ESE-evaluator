import { propsStringify } from './props-stringify';

describe('propsStringify', () => {
  it('works like JSON.stringify for not tested objects, but skip " for keys', () => {
    expect(propsStringify({ key: 'val' })).toMatchInlineSnapshot(
      `"{ key: \\"val\\" }"`,
    );
    expect(propsStringify({ key: 1 })).toMatchInlineSnapshot(`"{ key: 1 }"`);
    expect(propsStringify({ key: true })).toMatchInlineSnapshot(
      `"{ key: true }"`,
    );
    expect(propsStringify({ key1: false, key2: 2 })).toMatchInlineSnapshot(
      `"{ key1: false, key2: 2 }"`,
    );
  });

  it('throws error when passed value is of type object or function', () => {
    expect(() =>
      propsStringify({ key: {} }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot stringify [object Object] to neo4j format"`,
    );
    expect(() =>
      propsStringify({ key: () => null }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot stringify () => null to neo4j format"`,
    );
  });

  it('throws error when any key contain space', () => {
    expect(() =>
      propsStringify({ 'with space': true }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Key \\"with space\\" contains space"`,
    );
  });
});
