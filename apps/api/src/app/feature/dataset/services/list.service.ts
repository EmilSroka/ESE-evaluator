import { Injectable } from '@nestjs/common';
import { DatasetInfoCache } from './cache.service';
import {
  DatasetInfoDbModel,
  DatasetInfoDbWithOwnerModel,
  DatasetInfoWithOwnerModel,
} from '@ese/api-interfaces';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AccessDatasetInfoService {
  constructor(private cache: DatasetInfoCache) {}

  list(): Observable<DatasetInfoWithOwnerModel[]> {
    return of(this.cache.getAll().map(toDatasetWithOwner));
  }

  getByName(name: string): Observable<DatasetInfoWithOwnerModel> {
    return of(this.cache.getByName(name)).pipe(
      map(dataset => toDatasetWithOwner(dataset)),
    );
  }

  getDbModelByName(name: string): Observable<DatasetInfoDbModel> {
    return of(this.cache.getByName(name));
  }
}

function toDatasetWithOwner(
  data: DatasetInfoDbWithOwnerModel,
): DatasetInfoWithOwnerModel {
  const copy = { ...data };
  delete copy.createdAt;
  delete copy.id;
  return copy;
}
