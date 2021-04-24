export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserInterface {
  email: string;
  firstName: string;
  lastName?: string;
  password: string;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}
