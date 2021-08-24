import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { TranslationsModule } from './translations/translations.module';
import { RendererModule } from './renderer/renderer.module';

const API_URL = 'http://localhost:3333/graphql';

@NgModule({
  imports: [GraphQLModule.forRoot(API_URL), TranslationsModule, RendererModule],
})
export class CoreModule {}
