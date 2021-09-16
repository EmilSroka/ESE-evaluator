import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '@ese/api-interfaces';
import { UserData } from '../../auth/models/user-data.model';

@ObjectType()
export class User extends UserData implements UserModel {
  @Field() email: string;
}
