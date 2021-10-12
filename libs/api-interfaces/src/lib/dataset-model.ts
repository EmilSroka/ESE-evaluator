export interface DatasetInfoModel {
  name: string;
  description: string;
}

export interface DatasetInfoDbModel extends DatasetInfoModel {
  id: string;
  createdAt: number;
}

export interface DatasetInfoDbWithOwnerModel extends DatasetInfoDbModel {
  username: string;
}

export interface DatasetInfoWithOwnerModel extends DatasetInfoModel {
  username: string;
}

export interface CategoryModel {
  name: string;
  description?: string;
  items: string[];
}

export type DatasetModel = { string?: CategoryModel };
