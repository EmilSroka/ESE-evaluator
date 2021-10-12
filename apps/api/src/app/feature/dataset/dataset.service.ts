import { Injectable } from '@nestjs/common';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoModel,
  DatasetInfoWithOwnerModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { CreateDatasetService } from './services/create.service';
import { Observable } from 'rxjs';
import { ListDatasetInfoService } from './services/list.service';

@Injectable()
export class DatasetService {
  constructor(
    private createDatasetService: CreateDatasetService,
    private listDatasetService: ListDatasetInfoService,
  ) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    owner: UserDbModel,
  ): Observable<DatasetInfoDbWithOwnerModel> {
    return this.createDatasetService.create(info, file, owner);
  }

  list(): Observable<DatasetInfoWithOwnerModel[]> {
    return this.listDatasetService.list();
  }
}
