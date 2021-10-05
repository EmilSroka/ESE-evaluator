import { DatasetInfoModel } from '@ese/api-interfaces';
import { IsString } from 'class-validator';

export class CreateDatasetDto implements DatasetInfoModel {
  @IsString() description: string;
  @IsString() name: string;
}
