import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, partition } from 'rxjs';
import { Router } from '@angular/router';
import { Path } from '../../app-routing.module';

const UNAUTHENTICATED_CODE = 'Unauthorized';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const [error$, other$] = partition(next.handle(req), response =>
      this.isGraphQlErrorResponse(response),
    );
    error$.subscribe({
      next: () => (
        console.log('TODO: Unauthorized'),
        this.router.navigateByUrl(Path.public)
      ),
    });
    return other$;
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
