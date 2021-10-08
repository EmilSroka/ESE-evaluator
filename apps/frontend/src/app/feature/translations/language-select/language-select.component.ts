import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../service/translations.service';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LanguageModel } from '@ese/api-interfaces';

@Component({
  selector: 'ese-language-select',
  templateUrl: './language-select.component.html',
})
export class LanguageSelectComponent {
  languages: Observable<LanguageModel[]> = this.translationsService.config.pipe(
    pluck('languages'),
  );

  constructor(
    private translateService: TranslateService,
    private translationsService: TranslationsService,
  ) {}

  select(tag: string): void {
    this.translateService.use(tag);
  }

  get currentLanguage(): string {
    return this.translateService.currentLang;
  }
}
