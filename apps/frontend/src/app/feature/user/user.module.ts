import { NgModule } from '@angular/core';
import { UserLayoutComponent } from './layout/user-layout.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DisplayUserLayoutComponent } from './layout/display/display-user-layout.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EditUserLayoutComponent } from './layout/edit/edit-user-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UserLinkComponent } from './components/user-link/user-link.component';
import { RouterModule } from '@angular/router';

const externalComponents = [UserLinkComponent, UserLayoutComponent];

const internalComponents = [
  DisplayUserLayoutComponent,
  EditUserLayoutComponent,
];

const materialModules = [
  MatProgressSpinnerModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
];

@NgModule({
  declarations: [...internalComponents, ...externalComponents],
  exports: [...externalComponents],
  imports: [
    ...materialModules,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class UserModule {}
