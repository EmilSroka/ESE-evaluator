import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../../../feature/user/user.service';
import { partition } from 'rxjs';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ese-login-view',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.formBuilder.group({
    email: [''],
    password: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  login() {
    const [success$, fail$] = partition(
      this.userService.login(this.form.value),
      isLoggedIn => isLoggedIn,
    );

    success$.subscribe(() => {
      this.router.navigateByUrl(Path.private);
    });

    fail$.subscribe(() => {
      this.snackBar.open(
        this.translate.instant('toast_cannot_login'),
        this.translate.instant('toast_ok'),
      );
    });
  }
}
