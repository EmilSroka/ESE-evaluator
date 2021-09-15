import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@ese/api-interfaces';

@ObjectType()
export class User implements UserModel {
  @Field() email: string;
  @Field() username: string;
}
