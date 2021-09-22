import { gql } from '@apollo/client/core';
import { UserModel } from '@ese/api-interfaces';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        organization
      }
    }
  }
`;
export type LoginResult = {
  token: string;
  user: UserModel;
};
