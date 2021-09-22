import { NgModule } from '@angular/core';
import { GraphQLModule } from './graphql/graphql.module';
import { RendererModule } from './renderer/renderer.module';
import { TranslationsModule } from './translations/translations.module';
import { AuthModule } from './auth/auth.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// TODO: move to env
export const GRAPHQL_PATH = 'graphql';
const API_URL = `http://localhost:3333/${GRAPHQL_PATH}`;

@NgModule({
  imports: [
    GraphQLModule.forRoot(API_URL),
    TranslationsModule,
    RendererModule,
    AuthModule,
    MatSnackBarModule,
  ],
})
export class CoreModule {}
