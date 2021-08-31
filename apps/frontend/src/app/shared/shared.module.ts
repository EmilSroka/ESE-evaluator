import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationsModule } from './translations/translations.module';
import { ThemesModule } from './themes/themes.module';

@NgModule({
  exports: [CommonModule, TranslateModule, TranslationsModule, ThemesModule],
})
export class SharedModule {}
