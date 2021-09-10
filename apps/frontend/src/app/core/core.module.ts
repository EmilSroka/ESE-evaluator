import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { RendererModule } from './renderer/renderer.module';
import { TranslationsModule } from './translations/translations.module';

// TODO: move to env
const API_URL = 'http://localhost:3333/graphql';

@NgModule({
  imports: [GraphQLModule.forRoot(API_URL), TranslationsModule, RendererModule],
})
export class CoreModule {}
