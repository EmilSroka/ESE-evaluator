import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../feature/user/user.service';
import { partition } from 'rxjs';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  invalidPasswordErrorName,
  passwordsMatch,
  passwordsMatchErrorName,
  validPassword,
} from '../../../shared/forms/password.validator';
import { ConfirmPasswordMatcher } from '../../../shared/forms/confirm-password.matcher';
import {
  invalidUserErrorName,
  validUsername,
} from '../../../shared/forms/username.validator';
import { MatDialog } from '@angular/material/dialog';
import { MarkdownDialogComponent } from '../../../shared/markdown-dialog/markdown-dialog.component';

const MODAL_WIDTH = '400px';

@Component({
  selector: 'ese-register-view',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [Validators.required, validUsername()]);
  password = new FormControl('', [Validators.required, validPassword()]);
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
    private dialog: MatDialog,
  ) {}

  get emailErrorMessage(): string {
    if (this.email.hasError('required'))
      return this.translate.instant('forms_required_error');
    if (this.email.hasError('email'))
      return this.translate.instant('forms_email_error');
    return '';
  }

  get usernameErrorMessage(): string {
    if (this.username.hasError('required'))
      return this.translate.instant('forms_required_error');
    if (this.username.hasError(invalidUserErrorName))
      return this.translate.instant('forms_username_error');
    return '';
  }

  get passwordErrorMessage(): string {
    if (this.password.hasError('required'))
      return this.translate.instant('forms_required_error');
    if (this.password.hasError(invalidPasswordErrorName))
      return this.translate.instant('forms_password_error');
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
      errors => errors.length === 0,
    );

    success$.subscribe(() => {
      this.router.navigateByUrl(Path.private);
    });

    fail$.subscribe(codes => {
      this.snackBar.open(
        this.getErrorMessage(codes as string[]),
        this.translate.instant('toast_ok'),
      );
    });
  }

  openHelpInfo(): void {
    this.dialog.open(MarkdownDialogComponent, {
      data: this.translate.instant('modal_registration'),
      width: MODAL_WIDTH,
    });
  }

  private getErrorMessage(codes: string[]): string {
    const base = this.translate.instant('toast_cannot_register');
    const details = codes
      .map(code => `${code}_error`)
      .map(key => this.translate.instant(key));
    return `${base}: ${details.join(', ')}`;
  }
}
