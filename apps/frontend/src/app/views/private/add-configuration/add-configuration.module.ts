import { NgModule } from '@angular/core';
import { ConfigurationModule } from '../../../feature/configurations/configuration.module';
import { AddConfigurationComponent } from './add-configuration.component';

@NgModule({
  declarations: [AddConfigurationComponent],
  exports: [AddConfigurationComponent],
  imports: [ConfigurationModule],
})
export class AddConfigurationModule {}
