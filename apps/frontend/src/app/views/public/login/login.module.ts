import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { LoginIllustrationComponent } from './illustration.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, LoginIllustrationComponent],
  exports: [LoginComponent],
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
