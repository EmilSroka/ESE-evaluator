import { Field, ObjectType } from '@nestjs/graphql';
import { ConfigModel } from '@ese/api-interfaces';
import { DatasetInfo } from '../../dataset/models/dataset-info.model';
import { GetUser } from '../../user/models/get-user.model';

@ObjectType()
export class Configuration implements ConfigModel {
  @Field() name: string;
  @Field() description: string;
  @Field() categories: number;
  @Field() seeds: number;
  @Field(() => DatasetInfo) dataset: DatasetInfo;
  @Field(() => GetUser) owner: GetUser;
}
