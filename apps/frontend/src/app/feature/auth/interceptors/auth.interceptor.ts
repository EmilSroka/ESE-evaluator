import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (!req.url.includes(environment.api.base)) return next.handle(req);

    return this.auth.isAuthenticated().pipe(
      switchMap(isAuth => (isAuth ? this.getAuthHeaders() : of({}))),
      map(headers => req.clone({ setHeaders: headers })),
      switchMap(clone => next.handle(clone)),
    );
  }

  private getAuthHeaders(): Observable<AuthHeaders> {
    return this.auth
      .getToken()
      .pipe(map(token => ({ Authorization: `Bearer ${token}` })));
  }
}

type AuthHeaders = {
  Authorization?: string;
};
