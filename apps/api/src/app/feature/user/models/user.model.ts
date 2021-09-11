export interface User {
  id: string;
  email: string;
  username: string;
  passwordHash: string;
}

export interface UserCreate {
  email: string;
  username: string;
  passwordHash: string;
}
