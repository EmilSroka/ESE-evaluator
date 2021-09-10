import { NgModule } from '@angular/core';
import { PublicShellComponent } from './public-shell.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [PublicRoutingModule],
  declarations: [PublicShellComponent],
})
export class PublicModule {}
