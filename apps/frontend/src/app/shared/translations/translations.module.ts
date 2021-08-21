import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FlagPipe } from './flag/flag.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

const materialComponents = [MatIconModule, MatSelectModule];

@NgModule({
  imports: [
    ...materialComponents,
    TranslateModule,
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  exports: [TranslateModule, LanguageSelectComponent],
  declarations: [LanguageSelectComponent, FlagPipe],
})
export class TranslationsModule {}
