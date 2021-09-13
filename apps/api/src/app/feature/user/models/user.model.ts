interface UserBase {
  email: string;
  username: string;
}

export interface User extends UserBase {
  id: string;
  passwordHash: string;
}

export interface UserCreate extends UserBase {
  passwordHash: string;
}

export interface UserRegister extends UserBase {
  password: string;
}
