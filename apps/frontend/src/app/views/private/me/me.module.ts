import { NgModule } from '@angular/core';
import { UserModule } from '../../../feature/user/user.module';
import { MeComponent } from './me.component';
import { CommonModule } from '@angular/common';
import { IllustrationsModule } from '../../../shared/illustrations/illustrations.module';

@NgModule({
  imports: [UserModule, CommonModule, IllustrationsModule],
  declarations: [MeComponent],
  exports: [MeComponent],
})
export class MeModule {}
