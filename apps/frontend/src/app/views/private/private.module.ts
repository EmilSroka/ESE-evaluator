import { NgModule } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { PrivateRoutingModule } from './private-routing.module';
import { MeModule } from './me/me.module';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';

@NgModule({
  imports: [PrivateRoutingModule, MeModule, UserModule, CommonModule],
  declarations: [PrivateShellComponent],
})
export class PrivateModule {}
