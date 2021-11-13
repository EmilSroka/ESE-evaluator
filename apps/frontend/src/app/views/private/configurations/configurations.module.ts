import { NgModule } from '@angular/core';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationModule } from '../../../feature/configurations/configuration.module';
import { ConfigsIllustrationComponent } from './configs-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [
  MatTabsModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [ConfigurationsComponent, ConfigsIllustrationComponent],
  exports: [ConfigurationsComponent],
  imports: [...materialModules, ConfigurationModule, SharedModule],
})
export class ConfigurationsModule {}
