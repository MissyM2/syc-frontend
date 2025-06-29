import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
import type { User } from '../../interfaces/Interfaces.tsx';
import axios, { type AxiosResponse, AxiosError, isAxiosError } from 'axios';

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export type TUserList = User[];

const URL = 'http://localhost:3000';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response: AxiosResponse = await axios.get<TUserList>(
    `${URL}/syc/users`
  );
  console.log(response);
  return response.data as User[];
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

//export const userSelector = (state: RootState) => state.userReducer;
export default usersSlice.reducer;
