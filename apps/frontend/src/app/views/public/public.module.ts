import { NgModule } from '@angular/core';
import { PublicShellComponent } from './public-shell.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';

@NgModule({
  imports: [PublicRoutingModule, LoginModule, RegisterModule],
  declarations: [PublicShellComponent],
})
export class PublicModule {}
