import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { UserComponent } from './user.component';
import { UserModule as UsersModule } from '../../../feature/user/user.module';
import { CommonModule } from '@angular/common';
import { UserErrorIllustrationComponent } from './error-illustration.component';
import { IllustrationsModule } from '../../../shared/illustrations/illustrations.module';

const materialComponents = [MatCardModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [UserComponent, UserErrorIllustrationComponent],
  exports: [UserComponent],
  imports: [
    ...materialComponents,
    IllustrationsModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    UsersModule,
  ],
})
export class UserModule {}
