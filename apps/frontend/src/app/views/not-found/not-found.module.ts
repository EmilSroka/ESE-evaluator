import { NgModule } from '@angular/core';
import { IllustrationComponent } from './illustration/illustration.component';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [SharedModule, NotFoundRoutingModule, MatButtonModule],
  declarations: [IllustrationComponent, NotFoundComponent],
})
export class NotFoundModule {}
