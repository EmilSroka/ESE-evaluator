import { Logger, Module } from '@nestjs/common';
import { LanguagesResolver } from './resolvers/languages/languages.resolver';
import { TranslationModule } from '../../feature/translation/translation.module';
import { TranslationsResolver } from './resolvers/translations/translations.resolver';
import { JSONObjectScalar } from './scalars/jsonobject.scalar';
import { DEFAULT_LANGUAGE_TOKEN } from './resolvers/default-language/default-language.token';
import { DefaultLanguageResolver } from './resolvers/default-language/default-language.resolver';

const resolvers = [
  LanguagesResolver,
  TranslationsResolver,
  DefaultLanguageResolver,
];

const config = [
  {
    provide: DEFAULT_LANGUAGE_TOKEN,
    useValue: process.env.LANG_DEFAULT,
  },
];

@Module({
  imports: [TranslationModule],
  providers: [JSONObjectScalar, Logger, ...resolvers, ...config],
  exports: [...resolvers],
})
export class TranslationGqlApiModule {}
