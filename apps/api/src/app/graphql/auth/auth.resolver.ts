import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../../feature/auth/services/auth.service';
import { Observable } from 'rxjs';
import { UserWithToken } from './models/user-with-token.model';

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
}
