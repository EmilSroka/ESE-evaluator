import { DatasetInfoWithOwnerModel, UserModel } from '@ese/api-interfaces';

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
