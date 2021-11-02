import { NgModule } from '@angular/core';
import { ConfigurationCardComponent } from './components/configuration-card/configuration-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [ConfigurationCardComponent],
  imports: [MatCardModule, SharedModule, UserModule],
  exports: [ConfigurationCardComponent],
})
export class ConfigurationModule {}
