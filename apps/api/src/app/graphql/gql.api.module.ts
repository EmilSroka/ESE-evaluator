import { Module } from '@nestjs/common';
import { TranslationGqlApiModule } from './translations/translation.api.module';
import { AuthGqlApiModule } from './auth/auth.api.module';

const modules = [TranslationGqlApiModule, AuthGqlApiModule];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class GqlApiModule {}
