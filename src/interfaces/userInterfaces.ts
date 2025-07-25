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

export interface UserClosetitemReferencePayload {
  userId: string;
  closetitemId: string;
}
