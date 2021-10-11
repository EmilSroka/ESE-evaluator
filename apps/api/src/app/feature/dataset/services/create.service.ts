import { Inject, Injectable } from '@nestjs/common';
import { DatasetGateway } from '../gateways/dataset.gateway';
import {
  DatasetInfoDbModel,
  DatasetInfoModel,
  ValidationErrors,
} from '@ese/api-interfaces';
import { DatasetValidator } from '../validator/dataset.validator';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import {
  FILE_STORAGE,
  FileStorage,
} from '../../../providers/file-storage/file-storage';
import { switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ExceptionFactory } from '../../errors/exception.factory';

@Injectable()
export class CreateDatasetService {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    @Inject(FILE_STORAGE) private storage: FileStorage,
    private exceptionFactory: ExceptionFactory,
    private gateway: DatasetGateway,
    private validator: DatasetValidator,
  ) {}

  create(
    info: DatasetInfoModel,
    file: Buffer,
    ownerEmail: string,
  ): Observable<DatasetInfoDbModel> {
    const id = this.idService.generate();
    return this.validate(file, ownerEmail).pipe(
      switchMap(() => this.storage.save(`${id}.json`, file)),
      switchMap(() => this.gateway.create({ ...info, id }, ownerEmail)),
    );
  }

  private validate(file: Buffer, ownerEmail: string): Observable<null> {
    const asObject = JSON.parse(file.toString());
    if (!this.validator.isValid(asObject)) {
      return throwError(
        this.exceptionFactory.validation({
          place: 'CreateDatasetService#create',
          msg: 'Invalid dataset file structure',
          extra: `owner: "${ownerEmail}"`,
          codes: [ValidationErrors.InvalidDataset],
        }),
      );
    }
    return of(null);
  }
}
