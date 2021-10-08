import { Injectable } from '@angular/core';
import { CredentialsModel, UserUpdateModel } from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import {
  LOGIN,
  LoginResult,
  ME,
  MeOutput,
  REGISTER,
  RegisterInput,
  RegisterResult,
  UPDATE_USER,
} from './user.queries';
import {
  catchError,
  filter,
  map,
  observeOn,
  pluck,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { asyncScheduler, BehaviorSubject, Observable, of } from 'rxjs';
import { UserAuthModel } from '@ese/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<UserAuthModel | undefined>(undefined);

  constructor(private apollo: Apollo, private auth: AuthService) {
    this.auth
      .isAuthenticated()
      .pipe(
        observeOn(asyncScheduler),
        filter(isAuth => isAuth),
        switchMap(() => this.me()),
      )
      .subscribe({
        next: data => this.user$.next(data),
      });
  }

  get(): Observable<UserAuthModel | undefined> {
    return this.user$.asObservable();
  }

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
    this.user$.next(undefined);
    this.auth.clearToken();
  }

  update(data: UserUpdateModel): Observable<boolean> {
    const responseData$ = this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: { data },
      })
      .pipe(
        pluck<unknown, UserAuthModel>('data', 'updateUser'),
        shareReplay(1),
      );

    responseData$.subscribe({
      next: updated => this.user$.next(updated),
    });

    return this.isSuccess(responseData$);
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

  private isSuccess<T>(input$: Observable<T>): Observable<boolean> {
    return input$.pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }

  private me(): Observable<UserAuthModel> {
    return this.apollo
      .query<MeOutput>({ query: ME })
      .pipe(pluck('data', 'me'), shareReplay(1));
  }
}

const ignoreError = () => null;
