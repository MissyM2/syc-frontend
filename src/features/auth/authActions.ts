import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

interface UserLoginCredentials {
  email: string;
  password: string;
}

interface UserRegistrationCredentials {
  name: string;
  email: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }: UserLoginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/users/login', {
        email,
        password,
      });

      // store user's token in local storage
      sessionStorage.setItem('userToken', data.userToken);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { name, email, password }: UserRegistrationCredentials,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post('/api/users/register', {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
