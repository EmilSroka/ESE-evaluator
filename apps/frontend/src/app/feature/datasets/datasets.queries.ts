import { gql } from '@apollo/client/core';
import { DatasetInfoWithOwnerModel } from '@ese/api-interfaces';

export const LIST_DATASETS_INFO = gql`
  query List {
    listDataSets {
      name
      description
      username
    }
  }
`;
export type ListDatasetsInfoResult = {
  listDataSets: DatasetInfoWithOwnerModel[];
};
