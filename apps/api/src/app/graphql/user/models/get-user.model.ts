import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@ese/api-interfaces';

@ObjectType()
export class GetUser implements UserModel {
  @Field({ nullable: true }) email: string;
  @Field() username: string;
  @Field({ nullable: true }) organization?: string;
  @Field({ nullable: true }) about?: string;
}
