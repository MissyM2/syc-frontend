import type { Closetitem } from './closetInterfaces.ts';

export type TUserList = User[];

export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string;
  userRole: 'user' | 'admin' | null;
  closetitems: Closetitem[];
}

export interface UserState {
  currentUser: User | null;
  allUsers: User[];
  userRole: string;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
  userToken: string | null;
  isAuthenticated: boolean;
}
// export interface UsersState {
//   closetitems: User[];
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
//   success: boolean;
// }

export interface AuthState {
  status: string;
  currentUser: User | null;
  userRole: string;
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
  userRole: string;
};

export interface UserSubmitted {
  userName: string;
  email: string;
  password?: string;
  userRole: string;
  closetitems: string[];
}

export interface UserClosetitemReferenceArgs {
  userId: string;
  closetitemId: string;
}

export interface UserClosetitemReferenceReturn {
  userId: string;
  closetitemId: string;
}

export type AddUserArgs = Omit<User, '_id'>;

export type DeleteUserArgs = Omit<User, '_id'>;
