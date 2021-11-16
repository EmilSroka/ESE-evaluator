import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DatasetInfo implements DatasetInfoWithOwnerModel {
  @Field() description: string;
  @Field() name: string;
  @Field() username: string;
  @Field() categories: number;
  @Field() seeds: number;
}
