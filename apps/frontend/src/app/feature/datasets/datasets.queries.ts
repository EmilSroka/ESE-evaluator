import { gql } from '@apollo/client/core';

export const LIST_DATASETS_INFO = gql`
  query List {
    listDataSets {
      name
      description
      username
    }
  }
`;
