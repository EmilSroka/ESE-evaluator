import { NgModule } from '@angular/core';
import { ConfigurationCardComponent } from './components/configuration-card/configuration-card.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { ConfigurationListComponent } from './layout/list/configuration-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { IllustrationsModule } from '../../shared/illustrations/illustrations.module';

const materialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
];

@NgModule({
  declarations: [ConfigurationCardComponent, ConfigurationListComponent],
  imports: [
    ...materialModules,
    SharedModule,
    UserModule,
    ReactiveFormsModule,
    IllustrationsModule,
  ],
  exports: [ConfigurationListComponent],
})
export class ConfigurationModule {}
