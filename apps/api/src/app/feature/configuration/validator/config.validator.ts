import { Injectable } from '@nestjs/common';
import { AddConfigModel } from '@ese/api-interfaces';
import { forkJoin, Observable, of } from 'rxjs';
import { AccessConfigurationService } from '../services/list.service';
import { DatasetService } from '../../dataset/dataset.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ConfigValidator {
  constructor(
    private accessService: AccessConfigurationService,
    private datasetService: DatasetService,
  ) {}

  // note(es): function can be improved by returning list of validation errors
  isValid(data: AddConfigModel): Observable<true> {
    const dataset$ = this.datasetService.getByName(data.datasetName);

    return forkJoin({
      configNameTaken: this.accessService
        .getByName(data.name)
        .pipe(map(val => Boolean(val))),
      datasetDoesNotExist: dataset$.pipe(
        map(() => false),
        catchError(() => of(true)),
      ),
      dataset: dataset$,
    }).pipe(
      tap(({ configNameTaken, datasetDoesNotExist, dataset }) => {
        const invalidCategoriesNumber =
          data.categories < 1 || data.categories > dataset.categories;
        const invalidSeedsNumber = data.seeds < 1 || data.seeds > dataset.seeds;

        if (
          datasetDoesNotExist ||
          configNameTaken ||
          invalidCategoriesNumber ||
          invalidSeedsNumber
        ) {
          throw new Error();
        }
      }),
      map(() => true),
    );
  }
}
