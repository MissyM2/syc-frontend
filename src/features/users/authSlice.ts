import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
//import type { User, LoginUser } from '../../interfaces/Interfaces.tsx';
//import axios, { type AxiosResponse, AxiosError, isAxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

// export interface UserState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }
export interface User {
  _id: string;
  name: string;
  emailAddress: string;
  // password?: string;
  // token?: string;
  dateCreated: Date;
}

// export interface LoginRequest {
//   emailAddress: string;
//   password: string;
// }

// export interface LoginResponse {
//   user: User;
//   token: string;
//   message: string;
// }

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem('token');
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

//const URL = 'http://localhost:3000';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      console.log('registerUser, userData: ' + userData);
      const response = await axiosInstance.post('api/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { emailAddress: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('api/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  // async (token: string, { rejectWithValue }) => {
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: any; user: any }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          sessionStorage.setItem(
            'emailAddress',
            JSON.stringify(action.payload.user.emailAddress)
          );
          sessionStorage.setItem('token', action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
