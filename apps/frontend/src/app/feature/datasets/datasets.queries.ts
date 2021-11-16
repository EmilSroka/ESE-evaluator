import { gql } from '@apollo/client/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

export const LIST_DATASETS_INFO = gql`
  query List {
    listDataSets {
      name
      description
      username
      seeds
      categories
    }
  }
`;
export type ListDatasetsInfoResult = {
  listDataSets: DatasetInfoWithOwnerModel[];
};

export const EDIT_DATASET = gql`
  mutation Update($data: EditDataset!) {
    updateDataSets(data: $data) {
      name
      description
      username
    }
  }
`;
