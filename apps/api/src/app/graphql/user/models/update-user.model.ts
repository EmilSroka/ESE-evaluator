import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserUpdateModel } from '@ese/api-interfaces';

@ObjectType()
@InputType()
export class UpdateUser implements UserUpdateModel {
  @Field({ nullable: true }) about?: string;
  @Field({ nullable: true }) organization?: string;
  @Field({ nullable: true }) password?: string;
  @Field({ nullable: true }) username?: string;
}
