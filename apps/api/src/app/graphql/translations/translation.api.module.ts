import { Module } from '@nestjs/common';
import { LanguagesResolver } from './resolvers/languages/languages.resolver';
import { TranslationModule } from '../../feature/translation/translation.module';
import { TranslationsResolver } from './resolvers/translations/translations.resolver';
import { JSONObjectScalar } from './scalars/jsonobject.scalar';

@Module({
  imports: [TranslationModule],
  providers: [JSONObjectScalar, LanguagesResolver, TranslationsResolver],
  exports: [LanguagesResolver, TranslationsResolver],
})
export class TranslationGQLModule {}
