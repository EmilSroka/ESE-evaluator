import { gql } from '@apollo/client/core';
import { UserAuthModel } from '@ese/api-interfaces';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        username
        about
        organization
      }
    }
  }
`;
export type LoginResult = {
  token: string;
  user: UserAuthModel;
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
        about
        organization
      }
    }
  }
`;
export type RegisterResult = {
  token: string;
  user: UserAuthModel;
};
export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};

export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      email
      username
      about
      organization
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      about
      email
      organization
    }
  }
`;
export type MeOutput = {
  me: UserAuthModel;
};

export const UPDATE_USER = gql`
  mutation ChangeUser($data: UpdateUser!) {
    updateUser(data: $data) {
      email
      username
      organization
      about
    }
  }
`;
