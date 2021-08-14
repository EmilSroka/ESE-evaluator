import { Module } from '@nestjs/common';
import { LanguagesResolver } from './resolvers/languages/languages.resolver';
import { TranslationModule } from '../../feature/translation/translation.module';
import { TranslationsResolver } from './resolvers/translations/translations.resolver';
import { JSONObjectScalar } from './scalars/jsonobject.scalar';

const resolvers = [LanguagesResolver, TranslationsResolver];

@Module({
  imports: [TranslationModule],
  providers: [JSONObjectScalar, ...resolvers],
  exports: [...resolvers],
})
export class TranslationGQLModule {}
