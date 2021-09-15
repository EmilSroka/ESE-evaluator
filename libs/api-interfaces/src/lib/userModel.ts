export interface UserIdentity {
  email: string;
}

export interface UserData {
  username: string;
  organization?: string;
}

export interface UserAuthentication {
  password: string;
}

export interface UserModel extends UserIdentity, UserData {}

export interface CredentialsModel extends UserIdentity, UserAuthentication {}

export interface RegistrationModel
  extends UserIdentity,
    UserData,
    UserAuthentication {}

export interface UserBackendModel extends UserIdentity, UserData {
  passwordHash: string;
}
export interface UserDbModel extends UserBackendModel {
  id: string;
}

export interface UserWithTokenModel {
  user: UserModel;
  token: string;
}
