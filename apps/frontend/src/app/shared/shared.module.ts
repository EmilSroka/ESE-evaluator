import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsModule } from './translations/translations.module';

@NgModule({
  exports: [CommonModule, TranslateModule, TranslationsModule],
})
export class SharedModule {}
