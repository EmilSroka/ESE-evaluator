import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { Apollo } from 'apollo-angular';
import { LIST_DATASETS_INFO, ListDatasetsInfoResult } from './datasets.queries';

@Injectable({
  providedIn: 'root',
})
export class DatasetsService {
  private datasets = new BehaviorSubject<DatasetInfoWithOwnerModel[]>([]);
  datasets$ = this.datasets.asObservable();

  constructor(private apollo: Apollo) {}

  update() {
    this.apollo
      .query<ListDatasetsInfoResult>({
        query: LIST_DATASETS_INFO,
      })
      .subscribe({
        next: value => this.datasets.next(value.data.listDataSets),
      });
  }
}
