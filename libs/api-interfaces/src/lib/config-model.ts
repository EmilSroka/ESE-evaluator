import { UserModel } from './user-model';
import { DatasetInfoWithOwnerModel } from './dataset-model';

export interface ConfigInfoModel {
  name: string;
  description: string;
  seeds: number;
  categories: number;
}

export interface ConfigInfoDbModel extends ConfigInfoModel {
  id: string;
}

export interface ConfigModel extends ConfigInfoModel {
  owner: UserModel;
  dataset: DatasetInfoWithOwnerModel;
}

export interface AddConfigModel extends ConfigInfoModel {
  datasetName: string;
  ownerUsername: string;
}

export type BenchmarkData = {
  string?: string[];
};
