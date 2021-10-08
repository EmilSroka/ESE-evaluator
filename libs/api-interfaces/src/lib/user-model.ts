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

interface UserDbPassword {
  passwordHash: string;
}

export type UserDbUpdateModel = Partial<UserDataModel> &
  Partial<UserDbPassword>;
export type UserUpdateModel = Partial<UserDataModel> &
  Partial<UserAuthentication>;

export interface UserModel extends Partial<UserIdentity>, UserDataModel {}

export interface UserAuthModel extends UserIdentity, UserDataModel {}

export interface CredentialsModel extends UserIdentity, UserAuthentication {}

export interface RegistrationModel
  extends UserIdentity,
    UserDataModel,
    UserAuthentication {}

export interface UserBackendModel
  extends UserIdentity,
    UserDataModel,
    UserDbPassword {}

export interface UserDbModel extends UserBackendModel {
  id: string;
}

export interface UserWithTokenModel {
  user: UserAuthModel;
  token: string;
}
