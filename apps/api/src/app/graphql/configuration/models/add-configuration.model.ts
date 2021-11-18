import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AddConfigModel } from '@ese/api-interfaces';

@ObjectType()
@InputType()
export class AddConfiguration implements AddConfigModel {
  @Field() name: string;
  @Field() description: string;
  @Field() categories: number;
  @Field() seeds: number;
  @Field() datasetName: string;
  @Field() ownerUsername: string;
}
