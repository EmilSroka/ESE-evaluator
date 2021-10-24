import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { RendererModule } from './renderer/renderer.module';
import { TranslationsModule } from './translations/translations.module';
import { AuthModule } from './auth/auth.module';
import { ToastModule } from './toast/toast.module';
import { MarkdownModule } from 'ngx-markdown';
import { environment } from '../../environments/environment';

export const GRAPHQL_PATH = environment.api.graphQL;

@NgModule({
  imports: [
    GraphQLModule.forRoot(`${environment.api.base}${GRAPHQL_PATH}`),
    MarkdownModule.forRoot(),
    TranslationsModule,
    RendererModule,
    AuthModule,
    ToastModule,
  ],
})
export class CoreModule {}
