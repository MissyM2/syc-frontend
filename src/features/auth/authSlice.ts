import { createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { registerUser, userLogin } from './authActions';

export interface AuthState {
  loading: boolean;
  userInfo: any;
  userToken: string | null;
  error: string | null;
  success: boolean;
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
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      sessionStorage.removeItem('userToken'); // delete token from storage
      Object.assign(state, initialState);
    },
    setCredentials: (state, { payload }) => {
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
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.userToken;
        state.isAuthenticated = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
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
        state.error = payload;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
