import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeSelectComponent } from './theme-select/theme-select.component';

const materialComponents = [
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
];

@NgModule({
  imports: [SharedModule, ...materialComponents],
  declarations: [ThemeSelectComponent],
  exports: [ThemeSelectComponent],
})
export class ThemeModule {}
