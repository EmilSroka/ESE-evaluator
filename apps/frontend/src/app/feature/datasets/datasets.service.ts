import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {
  DatasetInfoModel,
  DatasetInfoWithOwnerModel,
} from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import { LIST_DATASETS_INFO, ListDatasetsInfoResult } from './datasets.queries';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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

  upload(data: UploadDataset): Observable<boolean> {
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('name', data.name);
    formData.append('description', data.description);
    return this.http
      .post(`${environment.api.base}/api/dataset/create`, formData)
      .pipe(
        tap(() => this.update()),
        map(() => true),
        catchError(() => of(false)),
      );
  }

  clear(): void {
    this.datasets.next([]);
  }
}
