import { Module } from '@nestjs/common';
import { TranslationGqlApiModule } from './translations/translation.api.module';

const modules = [TranslationGqlApiModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class GqlApiModule {}
