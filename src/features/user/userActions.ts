import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
import axios from 'axios';
import { AxiosError } from 'axios';
import { fetchClosetitems } from '@/features/closet/closetActions';

import type {
  User,
  UserState,
  //AuthState,
  AuthLoginArgs,
  AuthRegistrationArgs,
  UserClosetitemReferenceReturn,
  UserClosetitemReferenceArgs,
} from '../../interfaces/userInterfaces.ts';

const URL = 'http://localhost:3000';

export const userLogin = createAsyncThunk<
  UserState,
  AuthLoginArgs,
  { rejectValue: AxiosError }
>(
  'auth/login',
  async ({ email, password }: AuthLoginArgs, { dispatch, rejectWithValue }) => {
    try {
      const res = await axios.post(`${URL}/api/users/login`, {
        email,
        password,
      });
      sessionStorage.setItem('userToken', res.data.userToken);
      dispatch(fetchClosetitems(res.data.currentUser._id));
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// #2 User Registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { userName, email, password, userRole }: AuthRegistrationArgs,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${URL}/api/users/register`, {
        userName,
        email,
        password,
        userRole,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeUserClosetitemReference = createAsyncThunk<
  UserClosetitemReferenceReturn, // return type
  UserClosetitemReferenceArgs, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'users/removeUserItemReference',
  async (args: UserClosetitemReferenceArgs, { rejectWithValue }) => {
    console.log('removeUserClosetitemReference');
    try {
      const deleteUserClosetitemRefRes = await api.delete(
        `${URL}/api/users/${args.userId}/closetitems/${args.closetitemId}`
      );

      console.log('removeUserClosetitemReference: after delete');

      return deleteUserClosetitemRefRes.data as UserClosetitemReferenceReturn;
    } catch (error) {
      console.error('Error removing item reference from user:', error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        return rejectWithValue(
          (error as any).response?.data || 'Unknown error'
        );
      }
      return rejectWithValue('Unknown error');
    }
  }
);

// GET ALL USERS
export const fetchUsers = createAsyncThunk(
  'users/fetchusers',
  async (_, { rejectWithValue }) => {
    try {
      console.log('before get call');
      const allUsersFromAtlasRes = await api.get<User[]>(
        `${URL}/api/users/allusers`
      );
      console.log(
        'after get call ' + JSON.stringify(allUsersFromAtlasRes.data)
      );

      return allUsersFromAtlasRes.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data.message || 'Failed to fetch users'
        );
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);
