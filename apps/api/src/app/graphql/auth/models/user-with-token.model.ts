import { Field, ObjectType } from '@nestjs/graphql';
import { UserWithTokenModel } from '@ese/api-interfaces';
import { User } from '../../user/models/user.model';

@ObjectType()
export class UserWithToken implements UserWithTokenModel {
  @Field() token: string;
  @Field() user: User;
}
