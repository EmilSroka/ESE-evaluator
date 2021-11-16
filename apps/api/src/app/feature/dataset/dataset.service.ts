import { Injectable } from '@nestjs/common';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoModel,
  DatasetInfoWithOwnerModel,
  DatasetModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { CreateDatasetService } from './services/create.service';
import { Observable } from 'rxjs';
import { AccessDatasetInfoService } from './services/list.service';
import { EditDatasetService } from './services/edit.service';
import { AccessDatasetService } from './services/get.service';

@Injectable()
export class DatasetService {
  constructor(
    private createDatasetService: CreateDatasetService,
    private accessDatasetInfoService: AccessDatasetInfoService,
    private accessDatasetService: AccessDatasetService,
    private editDatasetService: EditDatasetService,
  ) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    owner: UserDbModel,
  ): Observable<DatasetInfoDbWithOwnerModel> {
    return this.createDatasetService.create(info, file, owner);
  }

  list(): Observable<DatasetInfoWithOwnerModel[]> {
    return this.accessDatasetInfoService.list();
  }

  getByName(name: string): Observable<DatasetInfoWithOwnerModel> {
    return this.accessDatasetInfoService.getByName(name);
  }

  getDataByName(name: string): Observable<DatasetModel> {
    return this.accessDatasetService.getByName(name);
  }

  update(
    currentName: string,
    owner: UserDbModel,
    newData: DatasetInfoModel,
  ): Observable<DatasetInfoDbWithOwnerModel> {
    return this.editDatasetService.update(currentName, newData, owner);
  }
}
