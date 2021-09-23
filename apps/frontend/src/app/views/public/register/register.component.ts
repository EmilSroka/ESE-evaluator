import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../feature/user/user.service';
import { partition } from 'rxjs';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  passwordsMatch,
  passwordsMatchErrorName,
} from './forms/password.validator';
import { ConfirmPasswordMatcher } from './forms/confirm-password.matcher';

@Component({
  selector: 'ese-register-view',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  repeatPassword = new FormControl('');

  form = this.formBuilder.group(
    {
      email: this.email,
      username: this.username,
      password: this.password,
      repeatPassword: this.repeatPassword,
    },
    { validators: passwordsMatch('password', 'repeatPassword') },
  );

  repeatPasswordErrorMatcher = new ConfirmPasswordMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  get emailErrorMessage(): string {
    if (this.email.hasError('required'))
      return this.translate.instant('forms_required_error');
    if (this.email.hasError('email'))
      return this.translate.instant('forms_email_error');
    return '';
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required'))
      return this.translate.instant('forms_required_error');
    return '';
  }

  get isRepeatPasswordInvalid(): boolean {
    return this.form.hasError(passwordsMatchErrorName);
  }

  get repeatPasswordErrorMessage(): string {
    if (this.form.hasError(passwordsMatchErrorName))
      return this.translate.instant('forms_match_passwords_error');
    return '';
  }

  register() {
    const { email, password, username } = this.form.value;

    const [success$, fail$] = partition(
      this.userService.register({ email, password, username }),
      isSuccess => isSuccess,
    );

    success$.subscribe(() => {
      this.router.navigateByUrl(Path.private);
    });

    fail$.subscribe(() => {
      this.snackBar.open(
        this.translate.instant('toast_cannot_register'),
        this.translate.instant('toast_ok'),
      );
    });
  }
}
