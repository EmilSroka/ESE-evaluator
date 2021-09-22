import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth.service';
import { Path } from '../../../app-routing.module';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.isAuthenticated().pipe(
      map(isAuth => {
        if (isAuth) return true;
        this.snackBar.open('You have no access to this content', 'ok', {
          duration: 6000,
        });
        return this.router.parseUrl(Path.public);
      }),
    );
  }
}
