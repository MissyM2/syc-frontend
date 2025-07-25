export type TUserList = User[];

export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string;
  closetitems: string[];
}

export interface UserState {
  userInfo: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}
export interface UsersState {
  closetitems: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  success: boolean;
}

export interface UserSubmitted {
  userName: string;
  email: string;
  password?: string;
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
