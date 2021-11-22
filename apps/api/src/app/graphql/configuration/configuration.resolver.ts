import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
import { CurrentUser } from '../../feature/auth/decorators/current-user.decorator';
import { UserDbModel } from '@ese/api-interfaces';
import { map, switchMap, tap } from 'rxjs/operators';
import { ExceptionFactory } from '../../feature/errors/exception.factory';
import { AddConfiguration } from './models/add-configuration.model';
import { ConfigurationService } from '../../feature/configuration/configuration.service';
import { Configuration } from './models/configuration.model';

@Resolver(of => Configuration)
export class ConfigurationResolver {
  constructor(
    private exceptionFactory: ExceptionFactory,
    private config: ConfigurationService,
  ) {}

  @Query(() => [Configuration])
  @UseGuards(JwtAuthGuard)
  listConfigurations(): Observable<Configuration[]> {
    return this.config.list();
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  addConfiguration(
    @CurrentUser() user: Observable<UserDbModel>,
    @Args('data') data: AddConfiguration,
  ): Observable<true> {
    return user.pipe(
      tap(user => {
        if (user.username === data.ownerUsername) return;
        this.exceptionFactory.notAuthorized({
          place: 'DatasetInfoResolver#addConfiguration',
          msg: 'Cannot create configuration for other users',
          extra: `user: ${user.username}, owner: ${data.ownerUsername}`,
        });
      }),
      switchMap(() => this.config.create(data)),
      map(() => true),
    );
  }
}
