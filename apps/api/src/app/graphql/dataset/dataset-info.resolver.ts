import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { forkJoin, Observable } from 'rxjs';
import { DatasetInfo } from './models/dataset-info.model';
import { DatasetService } from '../../feature/dataset/dataset.service';
import { CurrentUser } from '../../feature/auth/decorators/current-user.decorator';
import { UserDbModel } from '@ese/api-interfaces';
import { EditDataset } from './models/dataset-edit-model';
import { switchMap, tap } from 'rxjs/operators';
import {
  AbilityFactory,
  DatasetAction,
  wrapDataSet,
} from '../../feature/auth/ability.factory';
import { ExceptionFactory } from '../../feature/errors/exception.factory';

@Resolver(of => DatasetInfo)
export class DatasetInfoResolver {
  constructor(
    private datasets: DatasetService,
    private abilityFactory: AbilityFactory,
    private exceptionFactory: ExceptionFactory,
  ) {}

  @Query(() => [DatasetInfo])
  @UseGuards(JwtAuthGuard)
  listDataSets(): Observable<DatasetInfo[]> {
    return this.datasets.list();
  }

  @Query(() => DatasetInfo)
  @UseGuards(JwtAuthGuard)
  updateDataSets(
    @CurrentUser() user: Observable<UserDbModel>,
    @Args('data') data: EditDataset,
  ): Observable<DatasetInfo> {
    return forkJoin({
      dataset: this.datasets.getByName(data.oldName),
      user,
    }).pipe(
      tap(({ user, dataset }) => {
        const canUpdate = this.abilityFactory
          .createForDataset(user)
          .can(DatasetAction.Update, wrapDataSet(dataset));
        if (!canUpdate)
          throw this.exceptionFactory.notAuthorized({
            place: 'DatasetInfoResolver#updateDataSets',
            msg: 'Cannot modify dataset',
            extra: `user: ${user.username}, owner: ${dataset.username}`,
          });
      }),
      switchMap(({ user }) => {
        return this.datasets.update(data.oldName, user, {
          name: data.name,
          description: data.description,
        });
      }),
    );
  }
}
