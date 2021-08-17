import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { TranslationsModule } from './translations/translations.module';

const API_URL = 'http://localhost:3333/graphql';

@NgModule({
  imports: [GraphQLModule.forRoot(API_URL), TranslationsModule],
  exports: [GraphQLModule, TranslationsModule],
})
export class CoreModule {}
