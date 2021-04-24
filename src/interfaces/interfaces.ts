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

export interface BookInterface {
  id?: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  pages: number;
  language: string;
  image: string;
}

export interface FilterParams {
  limit: number;
  page: number;
}
