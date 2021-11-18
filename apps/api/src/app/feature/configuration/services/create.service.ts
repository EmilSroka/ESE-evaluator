import { Inject, Injectable } from '@nestjs/common';
import {
  AddConfigModel,
  ConfigInfoDbModel,
  ValidationErrors,
} from '@ese/api-interfaces';
import { ID_SERVICE, IdService } from '../../../shared/id/id-service.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { ExceptionFactory } from '../../errors/exception.factory';
import { ConfigValidator } from '../validator/config.validator';
import { DatasetService } from '../../dataset/dataset.service';
import { SeedsService } from './seeds.service';
import { Exception } from '../../errors/exception';
import { ConfigGateway } from '../gateways/config.gateway';

@Injectable()
export class CreateConfigService {
  constructor(
    @Inject(ID_SERVICE) private idService: IdService,
    private exceptionFactory: ExceptionFactory,
    private validator: ConfigValidator,
    private datasetService: DatasetService,
    private seedsService: SeedsService,
    private gateway: ConfigGateway,
  ) {}

  create(data: AddConfigModel): Observable<ConfigInfoDbModel> {
    const id = this.idService.generate();

    return this.validator.isValid(data).pipe(
      switchMap(() => this.datasetService.getDataByName(data.datasetName)),
      map(dataset =>
        this.seedsService.getBenchmarkData(
          dataset,
          data.categories,
          data.seeds,
        ),
      ),
      switchMap(benchmarkData =>
        this.gateway.create({ ...data, id }, benchmarkData),
      ),
      catchError(() =>
        throwError(this.getError(data.datasetName, data.ownerUsername)),
      ),
    );
  }

  private getError(datasetName: string, ownerEmail: string): Exception {
    return this.exceptionFactory.validation({
      place: 'CreateConfigService#create',
      msg: 'Invalid configuration data',
      extra: `owner: "${ownerEmail}", dataset: ${datasetName}`,
      codes: [ValidationErrors.InvalidConfiguration],
    });
  }
}
