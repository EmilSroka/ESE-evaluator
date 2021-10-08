import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { FlagPipe } from './language-select/flag/flag.pipe';

const materialComponents = [
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
];

@NgModule({
  imports: [SharedModule, ...materialComponents],
  declarations: [LanguageSelectComponent, FlagPipe],
  exports: [LanguageSelectComponent],
})
export class TranslationsModule {}
