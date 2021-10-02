import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UserComponent } from './user.component';
import { UserModule as UsersModule } from '../../../feature/user/user.module';
import { CommonModule } from '@angular/common';
import { UserProfileIllustrationComponent } from './profile-illustration.component';
import { UserErrorIllustrationComponent } from './error-illustration.component';

const materialComponents = [MatCardModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [
    UserComponent,
    UserProfileIllustrationComponent,
    UserErrorIllustrationComponent,
  ],
  exports: [UserComponent],
  imports: [
    ...materialComponents,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule,
  ],
})
export class UserModule {}
