import { Inject, Injectable } from '@nestjs/common';
import { DatasetGateway } from '../gateways/dataset.gateway';
import {
  DatasetInfoDbWithOwnerModel,
  DatasetInfoModel,
  UserDbModel,
  ValidationErrors,
} from '@ese/api-interfaces';
import { DatasetValidator } from '../validator/dataset.validator';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import {
  FILE_STORAGE,
  FileStorage,
} from '../../../providers/file-storage/file-storage';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExceptionFactory } from '../../errors/exception.factory';
import { DatasetInfoCache } from './cache.service';

@Injectable()
export class EditDatasetService {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    @Inject(FILE_STORAGE) private storage: FileStorage,
    private exceptionFactory: ExceptionFactory,
    private gateway: DatasetGateway,
    private validator: DatasetValidator,
    private cache: DatasetInfoCache,
  ) {}

  update(
    currentName: string,
    info: DatasetInfoModel,
    owner: UserDbModel,
  ): Observable<DatasetInfoDbWithOwnerModel> {
    this.handleValidity(currentName, info);
    this.cache.update(currentName, info);
    return this.gateway
      .update(currentName, info)
      .pipe(map(datasetInfo => ({ ...datasetInfo, username: owner.username })));
  }

  private handleValidity(currentName: string, info: DatasetInfoModel): void {
    if (currentName === info.name) return;
    if (this.cache.has(info.name)) {
      throw this.exceptionFactory.validation({
        place: 'EditDatasetService#update',
        msg: 'Dataset name taken',
        extra: `info: "${JSON.stringify(info)}"`,
        codes: [ValidationErrors.DatasetNameTaken],
      });
    }
  }
}
