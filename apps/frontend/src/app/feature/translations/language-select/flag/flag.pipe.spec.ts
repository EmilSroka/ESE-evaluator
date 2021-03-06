import { FlagPipe } from './flag.pipe';

describe('FlagPipe', () => {
  it.each([
    ['pl', 'π΅π±'],
    ['en-US', 'πΊπΈ'],
    ['en-gb', 'π¬π§'],
    ['ES', 'πͺπΈ'],
    ['PT-PT', 'π΅πΉ'],
  ])('maps tag (%s) to flag emoji (%s)', (tag, flag) => {
    const pipe = new FlagPipe();
    expect(pipe.transform(tag)).toBe(flag);
  });
});
