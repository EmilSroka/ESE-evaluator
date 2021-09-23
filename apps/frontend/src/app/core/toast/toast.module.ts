import { NgModule } from '@angular/core';
import {
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [MatSnackBarModule],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: { duration: environment.config.toast.duration },
    },
  ],
  exports: [MatSnackBarModule],
})
export class ToastModule {}
