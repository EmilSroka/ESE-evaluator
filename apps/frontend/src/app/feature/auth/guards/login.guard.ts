import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Path } from '../../../app-routing.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) return true;
        this.snackBar.open(
          this.translate.instant('toast_cannot_access_private_part'),
          this.translate.instant('toast_ok'),
        );
        return this.router.parseUrl(Path.public);
      }),
    );
  }
}
