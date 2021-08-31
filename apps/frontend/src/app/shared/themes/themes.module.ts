import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeSelectComponent } from './theme-select/theme-select.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

const materialComponents = [
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
];

@NgModule({
  imports: [...materialComponents, TranslateModule, CommonModule],
  exports: [ThemeSelectComponent],
  declarations: [ThemeSelectComponent],
})
export class ThemesModule {}
