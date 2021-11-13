import { NgModule } from '@angular/core';
import { UserProfileIllustrationComponent } from './profile-illustration.component';
import { SharedModule } from '../shared.module';
import { NoDataIllustrationComponent } from './no-data-illustration.component';

const illustrations = [
  NoDataIllustrationComponent,
  UserProfileIllustrationComponent,
];

@NgModule({
  declarations: [...illustrations],
  exports: [...illustrations],
  imports: [SharedModule],
})
export class IllustrationsModule {}
