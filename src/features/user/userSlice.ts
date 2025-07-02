import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { updateUser, deleteUser, getAllUsers } from './userActions';

export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  success: false,
};

export type TUserList = User[];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.users = action.payload;
        }
      )
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const updatedClosetitem = action.payload;
        const index = state.users.findIndex(
          (user) => user._id === updatedClosetitem._id
        );
        if (index !== -1) {
          state.users[index] = updatedClosetitem;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        const deletedUserId = action.payload;
        state.users = state.users.filter((user) => user._id !== deletedUserId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
