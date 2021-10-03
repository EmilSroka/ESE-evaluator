import { NgModule } from '@angular/core';
import { UserProfileIllustrationComponent } from './profile-illustration.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [UserProfileIllustrationComponent],
  exports: [UserProfileIllustrationComponent],
  imports: [SharedModule],
})
export class IllustrationsModule {}
