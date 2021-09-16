import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserDataModel } from '@ese/api-interfaces';

@ObjectType()
@InputType()
export class UserData implements UserDataModel {
  @Field() username: string;
  @Field({ nullable: true }) organization?: string;
}
