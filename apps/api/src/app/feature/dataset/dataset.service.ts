import { Injectable } from '@nestjs/common';
import {
  DatasetInfoDbModel,
  DatasetInfoModel,
  UserDbModel,
} from '@ese/api-interfaces';
import { CreateDatasetService } from './services/create.service';
import { Observable } from 'rxjs';

@Injectable()
export class DatasetService {
  constructor(private createDatasetService: CreateDatasetService) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    owner: UserDbModel,
  ): Observable<DatasetInfoDbModel> {
    return this.createDatasetService.create(info, file, owner);
  }
}
