import { NgModule } from '@angular/core';
import { PublicShellComponent } from './public-shell.component';
import { PublicRoutingModule } from './public-routing.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [PublicRoutingModule, LoginModule],
  declarations: [PublicShellComponent],
})
export class PublicModule {}
