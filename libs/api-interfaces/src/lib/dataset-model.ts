export interface DatasetInfoModel {
  name: string;
  description: string;
}

export interface DatasetMetadataModel {
  categories: number;
  seeds: number;
}

export interface DatasetInfoEditModel extends DatasetInfoModel {
  oldName: string;
}

export interface DatasetInfoDbModel
  extends DatasetInfoModel,
    DatasetMetadataModel {
  id: string;
  createdAt: number;
}

export interface DatasetInfoDbWithOwnerModel extends DatasetInfoDbModel {
  username: string;
}

export interface DatasetInfoWithOwnerModel
  extends DatasetInfoModel,
    DatasetMetadataModel {
  username: string;
}

export interface CategoryModel {
  name: string;
  description?: string;
  items: string[];
}

export type DatasetModel = { string?: CategoryModel };
