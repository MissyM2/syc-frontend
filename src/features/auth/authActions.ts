import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { User } from '../../interfaces/userInterfaces.ts';
import type { TClosetitemList } from '../../interfaces/closetTypes.ts';

export interface UserLoginPayload {
  email: string;
  password: string;
}

export interface UserLoginReturnPayload {
  _id: string;
  userName: string;
  email: string;
  closetitems: TClosetitemList;
}

interface UserRegistrationCredentials {
  userName: string;
  email: string;
  password: string;
}

const URL = 'http://localhost:3000';

// #1 User Login
export const userLogin = createAsyncThunk<
  { loggedInUserInfo: UserLoginReturnPayload; token: string },
  UserLoginPayload,
  { rejectValue: AxiosError }
>(
  'auth/login',
  async ({ email, password }: UserLoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });

      sessionStorage.setItem('userToken', response.data.userToken);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// #2 User Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { userName, email, password }: UserRegistrationCredentials,
    { rejectWithValue }
  ) => {
    try {
      console.log('what is userName? ' + userName);
      const response = await axios.post(`${URL}/api/user/register`, {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
