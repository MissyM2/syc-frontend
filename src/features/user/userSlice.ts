import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  User,
  UserState,
  //UserClosetitemReferencePayload,
} from '../../interfaces/userInterfaces';
//import type { TUserList } from './userTypes';

import {
  // updateUser,
  // deleteUser,
  // getAllUsers,
  removeUserClosetitemReference,
  //addUserClosetitemReference,
} from './userActions';

const initialState: UserState = {
  userInfo: null,
  status: 'idle',
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserAfterAuth: (state, action: PayloadAction<User>) => {
      // console.log(
      //   'inside addUserAfterAuth BEFORE UPDATE' +
      //     JSON.stringify(state.userInfo?.closetitems.length)
      // );

      state.userInfo = action.payload;
      // console.log(
      //   'inside addUserAfterAuth AFTER UPDATE' +
      //     JSON.stringify(state.userInfo.closetitems.length)
      // );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeUserClosetitemReference.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        removeUserClosetitemReference.fulfilled,
        (state, action: PayloadAction<UserClosetitemReferencePayload>) => {
          const deletedItemId = action.payload.closetitemId;

          if (state.userInfo) {
            state.userInfo.closetitems = state.userInfo.closetitems.filter(
              (id) => id !== deletedItemId
            );
          }
          console.log(
            'inside removeUserClosetitemReference.fulfilled state.userInfo?.closetitems.length: ' +
              state.userInfo?.closetitems.length
          );
        }
      )

      .addCase(removeUserClosetitemReference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { addUserAfterAuth } = userSlice.actions;
export default userSlice.reducer;
