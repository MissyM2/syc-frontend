import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './authActions';
import type { User } from '../user/userInterfaces.ts';
import type { TClosetitemList } from '../closetitem/closetitemTypes.ts';

export interface AuthState {
  loading: boolean;
  userInfo: User | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
  token: string | null;
  isAuthenticated: boolean;
}

// initialize userToken from local storage
const userToken = sessionStorage.getItem('userToken')
  ? sessionStorage.getItem('userToken')
  : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null,
  userToken,
  error: null,
  success: false,
  token: sessionStorage.getItem('userToken'), // initial load from sessionStorage
  isAuthenticated: !!sessionStorage.getItem('userToken'),
};

export interface UserLoginReturnPayload {
  _id: string;
  userName: string;
  email: string;
  closetitems: TClosetitemList;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        sessionStorage.setItem('userToken', action.payload);
      } else {
        sessionStorage.removeItem('userToken');
      }
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem('userToken');
      //Object.assign(state, initialState);
    },
    // logout: (state) => {
    //   sessionStorage.removeItem('userToken'); // delete token from storage
    //   Object.assign(state, initialState);
    // },
    setCredentials: (state, { payload }) => {
      //console.log('authSlice: payload is ' + JSON.stringify(payload));
      state.userInfo = payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder
      // login user
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (
          state,
          action: PayloadAction<{
            loggedInUserInfo: UserLoginReturnPayload;
            token: string;
          }>
        ) => {
          // console.log(
          //   'inside userLogin.fulfilled case.  What is loggedInUserInfo? ' +
          //     JSON.stringify(action.payload)
          // );
          state.loading = false;
          state.userInfo = action.payload.loggedInUserInfo;
          state.userToken = action.payload.token;
          state.isAuthenticated = true;
          // console.log(
          //   'inside userLogin.fulfilled case.  waht is state after update? ' +
          //     JSON.stringify(state.userInfo)
          // );
        }
      )
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          typeof payload === 'string' ? payload : 'An error occurred';
        payload;
        state.isAuthenticated = false;
      })
      // register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true; // registration successful
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error =
          typeof payload === 'string' ? payload : 'An error occurred';
      });
  },
});

// export const { logout, setCredentials } = authSlice.actions;
export const { setToken, logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
