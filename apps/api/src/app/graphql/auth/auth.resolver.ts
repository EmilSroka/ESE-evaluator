import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../feature/auth/services/auth.service';
import { Observable } from 'rxjs';
import { UserWithToken } from './models/user-with-token.model';
import { UserData } from '../user/models/user-data.model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../feature/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../feature/auth/decorators/current-user.decorator';
import { UserDbModel } from '@ese/api-interfaces';
import { switchMap } from 'rxjs/operators';
import { AuthUser } from './models/auth-user.model';
import { UserService } from '../../feature/user/user.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly auth: AuthService,
    private readonly userService: UserService,
  ) {}

  @Query(() => AuthUser)
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: Observable<UserDbModel>): Observable<AuthUser> {
    return user.pipe(
      switchMap(user => this.userService.getByEmail(user.email)),
    );
  }

  @Mutation(() => UserWithToken)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Observable<UserWithToken> {
    return this.auth.login({ email, password });
  }

  @Mutation(() => UserWithToken)
  register(
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('data') data: UserData,
  ): Observable<UserWithToken> {
    return this.auth.register({ email, password, ...data });
  }
}
