import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store.ts';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

const USERS_URL =
  'mongodb+srv://fdmaloney:Daisl9515$!#@@fdmclustersandbox.0zdlunl.mongodb.net/syc-backend?retryWrites=true&w=majority&appName=FDMClusterSandbox/users';
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get(USERS_URL);
  return response.data as User[];
});

// async thunk for making the POST request
export const postNewUser = createAsyncThunk(
  'users/postUser',
  async (newUser: Omit<User, 'id'>) => {
    const response = await axios.post(USERS_URL, newUser);
    return response.data as User;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users.';
      })
      .addCase(postNewUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postNewUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.users.push(action.payload);
      })
      .addCase(postNewUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create user.';
      });
  },
});

export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
