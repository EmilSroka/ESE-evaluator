import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RegisterIllustrationComponent } from './illustration.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent, RegisterIllustrationComponent],
  exports: [RegisterComponent],
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class RegisterModule {}
