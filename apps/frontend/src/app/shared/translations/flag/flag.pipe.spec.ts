import { FlagPipe } from './flag.pipe';

describe('FlagPipe', () => {
  it.each([
    ['pl', '🇵🇱'],
    ['en-US', '🇺🇸'],
    ['en-gb', '🇬🇧'],
    ['ES', '🇪🇸'],
    ['PT-PT', '🇵🇹'],
  ])('maps tag (%s) to flag emoji (%s)', (tag, flag) => {
    const pipe = new FlagPipe();
    expect(pipe.transform(tag)).toBe(flag);
  });
});
