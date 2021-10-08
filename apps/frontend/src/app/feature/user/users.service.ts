import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_USER } from './user.queries';
import { pluck, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserModel } from '@ese/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apollo: Apollo) {}

  get(username: string): Observable<UserModel> {
    return this.apollo
      .query({ query: GET_USER, variables: { username } })
      .pipe(pluck<unknown, UserModel>('data', 'user'), shareReplay(1));
  }
}
