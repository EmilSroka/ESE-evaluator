import { Injectable } from '@nestjs/common';
import { DatasetInfoDbModel, DatasetInfoModel } from '@ese/api-interfaces';
import { CreateDatasetService } from './services/create.service';
import { Observable } from 'rxjs';

@Injectable()
export class DatasetService {
  constructor(private createDatasetService: CreateDatasetService) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    ownerEmail: string,
  ): Observable<DatasetInfoDbModel> {
    return this.createDatasetService.create(info, file, ownerEmail);
  }
}
