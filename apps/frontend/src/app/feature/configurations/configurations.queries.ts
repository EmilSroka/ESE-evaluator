import { gql } from '@apollo/client/core';
import { ConfigModel } from '@ese/api-interfaces';

export const LIST_CONFIGURATIONS = gql`
  query ListConfigurations {
    listConfigurations {
      name
      description
      categories
      seeds
      dataset {
        name
        description
        username
        categories
        seeds
      }
      owner {
        email
        username
        organization
        about
      }
    }
  }
`;
export type ListConfigurationsResult = {
  listConfigurations: ConfigModel[];
};

export const ADD_CONFIGURATION = gql`
  mutation AddConfig($data: AddConfiguration!) {
    addConfiguration(data: $data)
  }
`;
