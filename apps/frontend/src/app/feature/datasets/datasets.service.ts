import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  DatasetInfoEditModel,
  DatasetInfoModel,
  DatasetInfoWithOwnerModel,
} from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import {
  EDIT_DATASET,
  LIST_DATASETS_INFO,
  ListDatasetsInfoResult,
} from './datasets.queries';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';

export interface UploadDataset extends DatasetInfoModel {
  file: File;
}

@Injectable({
  providedIn: 'root',
})
export class DatasetsService {
  private datasets = new BehaviorSubject<DatasetInfoWithOwnerModel[]>([]);
  datasets$ = this.datasets.asObservable();

  constructor(private apollo: Apollo, private http: HttpClient) {}

  update(): void {
    this.apollo
      .query<ListDatasetsInfoResult>({
        query: LIST_DATASETS_INFO,
        fetchPolicy: 'no-cache',
      })
      .subscribe({
        next: value => this.datasets.next(value.data.listDataSets),
      });
  }

  upload(data: UploadDataset): Observable<string[]> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('description', data.description);

    const request = this.http
      .post(`${environment.api.base}/api/dataset/create`, formData)
      .pipe(
        tap(() => this.update()),
        shareReplay(1),
      );

    return this.getErrorCodes(request);
  }

  edit(data: DatasetInfoEditModel): Observable<string[]> {
    const request = this.apollo
      .mutate({
        mutation: EDIT_DATASET,
        variables: { data },
      })
      .pipe(
        tap(() => this.update()),
        shareReplay(1),
      );

    return this.getErrorCodesGQL(request);
  }

  clear(): void {
    this.datasets.next([]);
  }

  private getErrorCodes<T>(input$: Observable<T>): Observable<string[]> {
    return input$.pipe(
      map(() => []),
      catchError((response: HttpErrorResponse) => {
        return of(response.error.data?.validationCodes ?? ['unknown']);
      }),
    );
  }

  private getErrorCodesGQL<T>(input$: Observable<T>): Observable<string[]> {
    return input$.pipe(
      map(() => []),
      catchError(error => {
        let data: string[];
        try {
          data = (JSON.parse(error.message) as ApiError).validationCodes;
        } catch {
          data = ['unknown'];
        }
        if (data.length === 0) data = ['unknown'];
        return of(data);
      }),
    );
  }
}

type ApiError = {
  errorCode: string;
  message: string;
  validationCodes: string[];
};
