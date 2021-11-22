import { Module } from '@nestjs/common';
import { TranslationGqlApiModule } from './translations/translation.api.module';
import { AuthGqlApiModule } from './auth/auth.api.module';
import { UserGqlApiModule } from './user/user.api.module';
import { DatasetGqlApiModule } from './dataset/dataset.api.module';
import { ConfigurationGqlApiModule } from './configuration/configuration.api.module';

const modules = [
  TranslationGqlApiModule,
  AuthGqlApiModule,
  UserGqlApiModule,
  DatasetGqlApiModule,
  ConfigurationGqlApiModule,
];

@Module({
  imports: [...modules],
  exports: [...modules],
})
export class GqlApiModule {}
