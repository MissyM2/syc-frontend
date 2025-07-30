import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AxiosError } from 'axios';
import { fetchClosetitems } from '@/features/closet/closetActions';
import type {
  AuthState,
  AuthLoginArgs,
  AuthRegistrationArgs,
} from '../../interfaces/authInterfaces.ts';

const URL = 'http://localhost:3000';

// #1 User Login
export const userLogin = createAsyncThunk<
  AuthState,
  AuthLoginArgs,
  { rejectValue: AxiosError }
>(
  'auth/login',
  async ({ email, password }: AuthLoginArgs, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });

      sessionStorage.setItem('userToken', response.data.userToken);
      console.log(
        'authActions: auth.state? ' + JSON.stringify(response.data.userInfo._id)
      );

      dispatch(fetchClosetitems(response.data.userInfo._id));
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
    { userName, email, password }: AuthRegistrationArgs,
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
