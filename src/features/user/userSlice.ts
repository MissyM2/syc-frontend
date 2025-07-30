import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  User,
  AuthState,
  UserState,
  UserClosetitemReferencePayload,
} from '../../interfaces/userInterfaces';
//import type { TUserList } from './userTypes';

import {
  registerUser,
  userLogin,
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
  userToken: sessionStorage.getItem('userToken'), // initial load from sessionStorage
  isAuthenticated: !!sessionStorage.getItem('userToken'),
};

const userToken = sessionStorage.getItem('userToken')
  ? sessionStorage.getItem('userToken')
  : null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetAuthSlice: (state) => {
      Object.assign(state, initialState);
      state.userToken = null;
      state.isAuthenticated = false;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.userToken = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        sessionStorage.setItem('userToken', action.payload);
      } else {
        sessionStorage.removeItem('userToken');
      }
    },
    logout: (state) => {
      state.userToken = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('userToken');
      //Object.assign(state, initialState);
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
    addUserAfterAuth: (state, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<AuthState>) => {
          state.status = 'succeeded';
          state.userInfo = action.payload.userInfo;
          state.error = null;
          state.success = true;
          state.userToken = action.payload.userToken;
          state.isAuthenticated = true;
        }
      )
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error =
          typeof payload === 'string' ? payload : 'An error occurred';
        payload;
        state.isAuthenticated = false;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error =
          typeof payload === 'string' ? payload : 'An error occurred';
      })
      .addCase(removeUserClosetitemReference.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        removeUserClosetitemReference.fulfilled,
        (state, action: PayloadAction<UserClosetitemReferencePayload>) => {
          console.log('removeUserClosetitemReference.fulfilled');
          state.status = 'succeeded';
          const deletedItemId = action.payload.closetitemId;

          if (state.userInfo) {
            state.userInfo.closetitems = state.userInfo.closetitems.filter(
              (id) => id !== deletedItemId
            );
          }
          console.log(
            'removeUserClosetitemReference.fulfilled after state update'
          );
        }
      )
      .addCase(removeUserClosetitemReference.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const {
  resetAuthSlice,
  setToken,
  logout,
  setCredentials,
  addUserAfterAuth,
} = userSlice.actions;
export default userSlice.reducer;
