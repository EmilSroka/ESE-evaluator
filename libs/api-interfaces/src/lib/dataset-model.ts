export interface DatasetInfoModel {
  name: string;
  description: string;
}

export interface DatasetInfoDbModel extends DatasetInfoModel {
  id: string;
}

export interface CategoryModel {
  name: string;
  description?: string;
  items: string[];
}

export type DatasetModel = { string?: CategoryModel };
