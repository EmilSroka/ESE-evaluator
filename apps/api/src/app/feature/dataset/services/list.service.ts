import { Injectable } from '@nestjs/common';
import { DatasetInfoCache } from './cache.service';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoWithOwnerModel,
} from '@ese/api-interfaces';
import { Observable, of } from 'rxjs';

@Injectable()
export class ListDatasetInfoService {
  constructor(private cache: DatasetInfoCache) {}

  list(): Observable<DatasetInfoWithOwnerModel[]> {
    return of(this.cache.getAll().map(toDatasetWithOwner));
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
