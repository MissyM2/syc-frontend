import type { User } from './userInterfaces.ts';

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   // other user properties
// }

// export interface User {
//   _id: number;
//   name: string;
//   emailAddress: string;
//   password?: string;
//   dateCreated: Date;
// }

// export interface AuthState {
//   user: User | null;
//   token: string | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

export interface AuthState {
  loading: boolean;
  userInfo: User | null;
  error: string | null;
  success: boolean;
  userToken: string | null;
  isAuthenticated: boolean;
}

export type AuthLoginArgs = {
  email: string;
  password: string;
};

export type AuthRegistrationArgs = {
  userName: string;
  email: string;
  password: string;
};
