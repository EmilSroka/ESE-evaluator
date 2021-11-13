import { NgModule } from '@angular/core';
import { ConfigurationModule } from '../../../feature/configurations/configuration.module';
import { AddConfigurationComponent } from './add-configuration.component';
import { AddConfigsIllustrationComponent } from './add-configuration-illustrations.component';
import { SharedModule } from '../../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const materialModules = [MatButtonModule, MatIconModule, MatTooltipModule];

@NgModule({
  declarations: [AddConfigurationComponent, AddConfigsIllustrationComponent],
  exports: [AddConfigurationComponent],
  imports: [...materialModules, ConfigurationModule, SharedModule],
})
export class AddConfigurationModule {}
