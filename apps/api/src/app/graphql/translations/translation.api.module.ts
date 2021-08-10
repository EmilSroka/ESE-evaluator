import { Module } from '@nestjs/common';
import { LanguagesResolver } from './resolvers/languages.resolver';
import { TranslationModule } from '../../feature/translation/translation.module';

@Module({
  imports: [TranslationModule],
  providers: [LanguagesResolver],
  exports: [LanguagesResolver],
})
export class TranslationGQLModule {}
