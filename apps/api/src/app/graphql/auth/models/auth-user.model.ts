import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@ese/api-interfaces';

@ObjectType()
export class AuthUser implements UserModel {
  @Field() email: string;
  @Field() username: string;
  @Field({ nullable: true }) organization?: string;
  @Field({ nullable: true }) about?: string;
}
