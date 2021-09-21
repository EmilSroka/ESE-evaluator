import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { GRAPHQL_PATH } from '../../core/core.module';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (req.url.includes(GRAPHQL_PATH)) return next.handle(req);

    return this.auth.isAuthenticated().pipe(
      map(isAuth => (isAuth ? this.getAuthHeaders() : {})),
      map(headers => req.clone({ setHeaders: headers })),
      switchMap(clone => next.handle(clone)),
    );
  }

  private getAuthHeaders(): Observable<AuthHeaders> {
    return this.auth.getToken().pipe(map(token => ({ Authorization: token })));
  }
}

type AuthHeaders = {
  Authorization?: string;
};
