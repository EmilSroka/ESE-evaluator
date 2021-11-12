import { NgModule } from '@angular/core';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationModule } from '../../../feature/configurations/configuration.module';
import { ConfigsIllustrationComponent } from './configs-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ConfigurationsComponent, ConfigsIllustrationComponent],
  exports: [ConfigurationsComponent],
  imports: [ConfigurationModule, SharedModule, MatTabsModule],
})
export class ConfigurationsModule {}
