import { Field, ObjectType } from '@nestjs/graphql';
import { UserWithTokenModel } from '@ese/api-interfaces';
import { AuthUser } from './auth-user.model';

@ObjectType()
export class UserWithToken implements UserWithTokenModel {
  @Field() token: string;
  @Field() user: AuthUser;
}
