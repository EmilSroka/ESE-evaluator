import { DatasetInfoEditModel } from '@ese/api-interfaces';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType()
export class EditDataset implements DatasetInfoEditModel {
  @Field() description: string;
  @Field() name: string;
  @Field() oldName: string;
}
