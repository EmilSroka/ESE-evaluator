import { Field, ObjectType } from '@nestjs/graphql';
import { UserAuthModel } from '@ese/api-interfaces';

@ObjectType()
export class GetUser implements UserAuthModel {
  @Field({ nullable: true }) email: string;
  @Field() username: string;
  @Field({ nullable: true }) organization?: string;
  @Field({ nullable: true }) about?: string;
}
