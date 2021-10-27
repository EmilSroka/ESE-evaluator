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
import { DatasetsService } from '../datasets/datasets.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$ = new BehaviorSubject<UserAuthModel | undefined>(undefined);

  constructor(
    private apollo: Apollo,
    private auth: AuthService,
    private datasets: DatasetsService,
  ) {
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

  register(data: RegisterInput): Observable<string[]> {
    const responseData$ = this.apollo
      .mutate({ mutation: REGISTER, variables: data })
      .pipe(pluck<unknown, RegisterResult>('data', 'register'), shareReplay(1));

    this.handleAuth(responseData$);

    return this.getErrorCodes(responseData$);
  }

  logout() {
    this.user$.next(undefined);
    this.auth.clearToken();
    this.datasets.clear();
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
    const isSuccess$ = this.isSuccess(responseData$);
    this.handleOptimisticUpdate(data, isSuccess$);
    return isSuccess$;
  }

  private handleOptimisticUpdate(
    data: UserUpdateModel,
    isSuccess$: Observable<boolean>,
  ): void {
    if (this.user$.value == null) return;
    const userDataCopy = { ...this.user$.value };
    const updated = { ...userDataCopy };
    if (data.username) updated.username = data.username;
    if (data.organization) updated.organization = data.organization;
    if (data.about) updated.about = data.about;
    this.user$.next(updated);

    isSuccess$
      .pipe(filter(isSuccess => !isSuccess))
      .subscribe(() => this.user$.next(userDataCopy));
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

  private getErrorCodes<T>(input$: Observable<T>): Observable<string[]> {
    return input$.pipe(
      map(() => []),
      catchError(error => {
        let data: string[];
        try {
          data = (JSON.parse(error.message) as RegistrationError)
            .validationCodes;
        } catch {
          data = ['unknown'];
        }
        return of(data);
      }),
    );
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

type RegistrationError = {
  errorCode: string;
  message: string;
  validationCodes: string[];
};
