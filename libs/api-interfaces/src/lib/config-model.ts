import { UserModel } from './user-model';
import { DatasetInfoWithOwnerModel } from './dataset-model';

export interface ConfigInfoModel {
  name: string;
  description: string;
  seeds: number;
  categories: number;
}

export interface ConfigModel extends ConfigInfoModel {
  owner: UserModel;
  dataset: DatasetInfoWithOwnerModel;
}

export interface AddConfigModel extends ConfigInfoModel {
  dataset_name: string;
  owner_username: string;
}
