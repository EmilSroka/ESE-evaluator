import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AddConfigModel, ConfigModel } from '@ese/api-interfaces';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import {
  ADD_CONFIGURATION,
  LIST_CONFIGURATIONS,
  ListConfigurationsResult,
} from './configurations.queries';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationsService {
  private configurations = new BehaviorSubject<ConfigModel[]>([]);
  configurations$ = this.configurations.asObservable();

  constructor(private apollo: Apollo) {}

  update(): void {
    this.apollo
      .query<ListConfigurationsResult>({
        query: LIST_CONFIGURATIONS,
        fetchPolicy: 'no-cache',
      })
      .subscribe({
        next: value => this.configurations.next(value.data.listConfigurations),
      });
  }

  add(data: AddConfigModel): Observable<boolean> {
    return this.apollo
      .mutate({
        mutation: ADD_CONFIGURATION,
        variables: { data },
      })
      .pipe(
        tap(() => this.update()),
        shareReplay(1),
        map(response => Boolean(response.data)),
        catchError(() => of(false)),
      );
  }

  clear(): void {
    this.configurations.next([]);
  }
}
