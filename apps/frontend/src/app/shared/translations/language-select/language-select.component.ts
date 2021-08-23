import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsInitializerService } from '../../../core/translations/initializers/translations.initializer';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LanguageModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-language-select',
  templateUrl: './language-select.component.html',
})
export class LanguageSelectComponent {
  languages: Observable<LanguageModel[]> =
    this.translationsInitializerService.config.pipe(pluck('languages'));

  constructor(
    private translateService: TranslateService,
    private translationsInitializerService: TranslationsInitializerService,
  ) {}

  select(tag: string): void {
    this.translateService.use(tag);
  }
}
