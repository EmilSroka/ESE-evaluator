import { Injectable } from '@angular/core';
import { CredentialsModel } from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import {
  LOGIN,
  LoginResult,
  REGISTER,
  RegisterInput,
  RegisterResult,
} from './user.queries';
import { catchError, map, pluck, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserModel } from '@ese/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<UserModel | null>(null);

  constructor(private apollo: Apollo, private auth: AuthService) {}

  login(credentials: CredentialsModel): Observable<boolean> {
    const responseData$ = this.apollo
      .mutate({ mutation: LOGIN, variables: credentials })
      .pipe(pluck<unknown, LoginResult>('data', 'login'), shareReplay(1));

    this.handleAuth(responseData$);

    return this.isSuccess(responseData$);
  }

  register(data: RegisterInput): Observable<boolean> {
    const responseData$ = this.apollo
      .mutate({ mutation: REGISTER, variables: data })
      .pipe(pluck<unknown, RegisterResult>('data', 'register'), shareReplay(1));

    this.handleAuth(responseData$);

    return this.isSuccess(responseData$);
  }

  logout() {
    this.user$.next(null);
  }

  private handleAuth(input$: Observable<LoginResult>): void {
    input$.subscribe({
      next: ({ token, user }) => {
        this.auth.setToken(token);
        this.user$.next(user);
      },
      error: ignoreError,
    });
  }

  private isSuccess(input$: Observable<LoginResult>): Observable<boolean> {
    return input$.pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}

const ignoreError = () => null;
