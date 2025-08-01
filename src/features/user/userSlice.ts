import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  User,
  AuthState,
  UserState,
  //UserClosetitemReferencePayload,
} from '../../interfaces/userInterfaces';
//import type { TUserList } from './userTypes';

import {
  registerUser,
  userLogin,
  // updateUser,
  // deleteUser,
  fetchUsers,
  removeUserClosetitemReference,
  //addUserClosetitemReference,
} from './userActions';

const initialState: UserState = {
  currentUser: null,
  allUsers: [],
  userRole: '',
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
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.allUsers = action.payload;
    },
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
    // setCredentials: (state, { payload }) => {
    //   state.currentUser = payload;
    // },
    addUserAfterAuth: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
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
        (state, action: PayloadAction<UserState>) => {
          state.status = 'succeeded';
          state.currentUser = action.payload.currentUser;
          state.userRole = action.payload.userRole;
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

          if (state.currentUser) {
            state.currentUser.closetitems =
              state.currentUser.closetitems.filter(
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
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        console.log(
          'what is payload after fetchUsers? ' + JSON.stringify(action.payload)
        );
        state.status = 'succeeded';
        state.allUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const {
  setCurrentUser,
  setAllUsers,
  resetAuthSlice,
  setToken,
  logout,
  setCredentials,
  addUserAfterAuth,
} = userSlice.actions;
export default userSlice.reducer;
