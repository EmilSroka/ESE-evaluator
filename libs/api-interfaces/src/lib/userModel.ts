export interface UserIdentity {
  email: string;
}

export interface UserDataModel {
  username: string;
  organization?: string;
  about?: string;
}

export interface UserAuthentication {
  password: string;
}

export interface UserModel extends UserIdentity, UserDataModel {}

export interface CredentialsModel extends UserIdentity, UserAuthentication {}

export interface RegistrationModel
  extends UserIdentity,
    UserDataModel,
    UserAuthentication {}

export interface UserBackendModel extends UserIdentity, UserDataModel {
  passwordHash: string;
}
export interface UserDbModel extends UserBackendModel {
  id: string;
}

export interface UserWithTokenModel {
  user: UserModel;
  token: string;
}
