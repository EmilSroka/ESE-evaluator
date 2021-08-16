import { Module } from '@nestjs/common';
import { LanguagesResolver } from './resolvers/languages/languages.resolver';
import { TranslationModule } from '../../feature/translation/translation.module';
import { TranslationsResolver } from './resolvers/translations/translations.resolver';
import { JSONObjectScalar } from './scalars/jsonobject.scalar';
import { DEFAULT_LANGUAGE_TOKEN } from './resolvers/default-language/default-language.token';

const resolvers = [LanguagesResolver, TranslationsResolver];

const config = [
  {
    provide: DEFAULT_LANGUAGE_TOKEN,
    useValue: 'en',
  },
];

@Module({
  imports: [TranslationModule],
  providers: [JSONObjectScalar, ...resolvers, ...config],
  exports: [...resolvers],
})
export class TranslationGQLModule {}
