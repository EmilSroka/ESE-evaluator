import { propsUpdateStringify } from './props-update-stringify';

const variable = 'u';

describe('propsStringify', () => {
  it('creates string that contains list of assignments in form "variable.key = value" separated by comma', () => {
    expect(
      propsUpdateStringify(variable, { key: 'val' }),
    ).toMatchInlineSnapshot(`"u.key = \\"val\\""`);
    expect(propsUpdateStringify(variable, { key: 1 })).toMatchInlineSnapshot(
      `"u.key = 1"`,
    );
    expect(propsUpdateStringify(variable, { key: true })).toMatchInlineSnapshot(
      `"u.key = true"`,
    );
    expect(
      propsUpdateStringify(variable, { key1: false, key2: 2 }),
    ).toMatchInlineSnapshot(`"u.key1 = false, u.key2 = 2"`);
  });

  it('throws error when passed value is of type object or function', () => {
    expect(() =>
      propsUpdateStringify(variable, { key: {} }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot stringify [object Object] to create assignment"`,
    );
    expect(() =>
      propsUpdateStringify(variable, { key: () => null }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Cannot stringify () => null to create assignment"`,
    );
  });

  it('throws error when any key contain space', () => {
    expect(() =>
      propsUpdateStringify(variable, { 'with space': true }),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Key \\"with space\\" contains space"`,
    );
  });
});
