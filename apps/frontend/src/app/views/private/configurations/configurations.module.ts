import { NgModule } from '@angular/core';
import { ConfigurationsComponent } from './configurations.component';
import { ConfigurationModule } from '../../../feature/configurations/configuration.module';

@NgModule({
  declarations: [ConfigurationsComponent],
  exports: [ConfigurationsComponent],
  imports: [ConfigurationModule],
})
export class ConfigurationsModule {}
