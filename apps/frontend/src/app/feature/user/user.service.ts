import { Injectable } from '@angular/core';
import { CredentialsModel } from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import { LOGIN, LoginResult } from './user.queries';
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

    responseData$.subscribe({
      next: ({ token, user }) => {
        this.auth.setToken(token);
        this.user$.next(user);
      },
      error: ignoreError,
    });

    return responseData$.pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  logout() {
    this.user$.next(null);
  }
}

const ignoreError = () => null;
