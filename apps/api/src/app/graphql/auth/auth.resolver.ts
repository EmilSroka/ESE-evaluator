import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../feature/auth/services/auth.service';
import { Observable } from 'rxjs';
import { UserWithToken } from './models/user-with-token.model';
import { UserData } from '../user/models/user-data.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

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
