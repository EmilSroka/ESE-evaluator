import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { forkJoin, Observable } from 'rxjs';
import { UserData } from './models/user-data.model';
import { GetUser } from './models/get-user.model';
import { UserService } from '../../feature/user/user.service';
import { JwtAuthGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { AuthUser } from '../auth/models/auth-user.model';
import { CurrentUser } from '../../feature/auth/decorators/current-user.decorator';
import { UpdateUser } from './models/update-user.model';
import { UserDbModel } from '@ese/api-interfaces';
import { map, switchMap } from 'rxjs/operators';
import {
  AbilityFactory,
  UserAction,
  wrapUser,
} from '../../feature/auth/ability.factory';

@Resolver(() => UserData)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Query(() => GetUser)
  @UseGuards(JwtAuthGuard)
  user(
    @Args('username') username: string,
    @CurrentUser() user: Observable<UserDbModel>,
  ): Observable<GetUser> {
    return forkJoin({
      requestedUser: this.userService.getByUsername(username),
      user: user,
    }).pipe(
      map(({ requestedUser, user }) => {
        const canAccessEmail = this.abilityFactory
          .createForUser(user)
          .can(UserAction.FullRead, wrapUser(requestedUser));

        if (!canAccessEmail) {
          delete user.email;
        }

        return user;
      }),
    );
  }

  @Mutation(() => AuthUser)
  @UseGuards(JwtAuthGuard)
  updateUser(
    @Args('data') data: UpdateUser,
    @CurrentUser() user: Observable<UserDbModel>,
  ): Observable<AuthUser> {
    return user.pipe(
      switchMap(({ email }) => this.userService.update(email, data)),
    );
  }
}
