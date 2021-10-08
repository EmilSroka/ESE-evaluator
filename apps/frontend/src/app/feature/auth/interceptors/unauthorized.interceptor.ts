import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Path } from '../../../app-routing.module';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, shareReplay, switchMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

const UNAUTHENTICATED_CODE = 'Unauthorized';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private auth: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const request$ = next.handle(req).pipe(shareReplay(1));
    request$
      .pipe(
        filter(response => this.isGraphQlErrorResponse(response)),
        switchMap(() => this.auth.isAuthenticated()),
        filter(isAuth => isAuth),
      )
      .subscribe({
        next: () => {
          this.userService.logout();
          this.router.navigateByUrl(Path.public);
          this.snackBar.open(
            this.translate.instant('toast_logout'),
            this.translate.instant('toast_ok'),
          );
        },
      });
    return request$;
  }

  private isGraphQlErrorResponse(value: any) {
    return value instanceof HttpResponse && this.isUnauthenticated(value);
  }

  private isUnauthenticated(response: HttpResponse<any>): boolean {
    const errors = response.body?.errors ?? [];
    if (errors == null || typeof errors !== 'object') return false;
    const isAuthError = errors?.some(
      (error: { message: string }) => error?.message === UNAUTHENTICATED_CODE,
    );
    return Boolean(isAuthError);
  }
}
