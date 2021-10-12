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
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ExceptionFactory } from '../../errors/exception.factory';
import { DatasetInfoCache } from './cache.service';

@Injectable()
export class CreateDatasetService {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    @Inject(FILE_STORAGE) private storage: FileStorage,
    private exceptionFactory: ExceptionFactory,
    private gateway: DatasetGateway,
    private validator: DatasetValidator,
    private cache: DatasetInfoCache,
  ) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    owner: UserDbModel,
  ): Observable<DatasetInfoDbWithOwnerModel> {
    const id = this.idService.generate();
    const date = getDateProps();
    this.handleValidity(info, file, owner.email);
    return this.storage.save(`${id}.json`, file).pipe(
      switchMap(() => this.gateway.create({ ...info, ...date, id }, owner)),
      map(datasetInfo => ({ ...datasetInfo, username: owner.username })),
      tap(datasetInfo => this.cache.add(datasetInfo)),
    );
  }

  private handleValidity(
    info: DatasetInfoModel,
    file: Buffer,
    ownerEmail: string,
  ): void {
    const asObject = JSON.parse(file.toString());
    if (!this.validator.isValid(asObject)) {
      throw this.exceptionFactory.validation({
        place: 'CreateDatasetService#create',
        msg: 'Invalid dataset file structure',
        extra: `owner: "${ownerEmail}"`,
        codes: [ValidationErrors.InvalidDataset],
      });
    }
    if (this.cache.has(info.name)) {
      throw this.exceptionFactory.validation({
        place: 'CreateDatasetService#create',
        msg: 'Dataset name taken',
        extra: `info: "${JSON.stringify(info)}"`,
        codes: [ValidationErrors.DatasetNameTaken],
      });
    }
  }
}

function getDateProps(): { createdAt: number } {
  return { createdAt: new Date().getTime() };
}