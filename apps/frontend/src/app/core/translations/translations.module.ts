import {
  TranslateLoader,
  TranslateModule,
  TranslatePipe,
} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { TranslateLoaderFactory } from './loaders/translations.loader';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import {
  translationsInitializerFactory,
  TranslationsInitializerService,
} from './initializers/translations.initializer';

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateLoaderFactory,
        deps: [Apollo],
      },
    }),
  ],
  providers: [
    TranslationsInitializerService,
    {
      provide: APP_INITIALIZER,
      useFactory: translationsInitializerFactory,
      multi: true,
      deps: [TranslationsInitializerService],
    },
  ],
  exports: [TranslatePipe],
})
export class TranslationsModule {}
