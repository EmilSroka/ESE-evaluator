import { Scalar, CustomScalar } from '@nestjs/graphql';

@Scalar('Translations', type => Object)
export class TranslationsScalar
  implements CustomScalar<Record<string, string>, null>
{
  description = 'JSON custom scalar type';

  serialize(value: { string?: string }): Record<string, string> {
    return value;
  }

  parseValue(): never {
    throw new Error('Translations can be used only as an output');
  }

  parseLiteral(): never {
    throw new Error('Translations can be used only as an output');
  }
}
