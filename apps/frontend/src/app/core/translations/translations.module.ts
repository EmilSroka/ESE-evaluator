import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { TranslateLoaderFactory } from '../../feature/translations/loader/translations.loader';
import {
  translationsInitializerFactory,
  TranslationsService,
} from '../../feature/translations/service/translations.service';

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
    {
      provide: APP_INITIALIZER,
      useFactory: translationsInitializerFactory,
      multi: true,
      deps: [TranslationsService],
    },
  ],
})
export class TranslationsModule {}
