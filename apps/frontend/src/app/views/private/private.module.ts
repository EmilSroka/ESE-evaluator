import { NgModule } from '@angular/core';
import { PrivateShellComponent } from './private-shell.component';
import { PrivateRoutingModule } from './private-routing.module';

@NgModule({
  imports: [PrivateRoutingModule],
  declarations: [PrivateShellComponent],
})
export class PrivateModule {}
