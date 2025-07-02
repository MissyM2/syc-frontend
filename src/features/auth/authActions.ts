import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserLoginCredentials {
  email: string;
  password: string;
}

interface UserRegistrationCredentials {
  userName: string;
  email: string;
  password: string;
}

const URL = 'http://localhost:3000';

// #1 User Login
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserLoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });

      sessionStorage.setItem('userToken', data.userToken);
      return data;
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
      const response = await axios.post('/api/users/register', {
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
