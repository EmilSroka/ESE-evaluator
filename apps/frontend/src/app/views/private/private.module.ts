import { NgModule } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { PrivateRoutingModule } from './private-routing.module';
import { MeModule } from './me/me.module';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { DatasetsModule } from './datasets/datasets.module';
import { ConfigurationsModule } from './configurations/configurations.module';

const pageModules = [
  MeModule,
  UserModule,
  DatasetsModule,
  ConfigurationsModule,
];

@NgModule({
  imports: [...pageModules, PrivateRoutingModule, CommonModule],
  declarations: [PrivateShellComponent],
})
export class PrivateModule {}
