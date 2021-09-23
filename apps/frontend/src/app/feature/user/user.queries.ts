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

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $username: String!) {
    register(
      email: $email
      password: $password
      data: { username: $username }
    ) {
      token
      user {
        email
        username
        organization
      }
    }
  }
`;
export type RegisterResult = {
  token: string;
  user: UserModel;
};
export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};
