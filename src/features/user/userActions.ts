import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import type {
  User,
  UserClosetitemReferencePayload,
} from '../../interfaces/userInterfaces.ts';
import type { DeleteClosetitemArgs } from '../../interfaces/closetitemInterfaces.ts';

const URL = 'http://localhost:3000';

export const addUserClosetitemReference = createAsyncThunk<
  UserClosetitemReferencePayload, // return type
  UserClosetitemReferencePayload, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'users/addUserItemReference',
  async ({ userId, closetitemId }, { dispatch, rejectWithValue }) => {
    try {
      console.log('inside userActions:addUserClosetitemReference');
      console.log('what is userId? ' + userId);
      console.log('what is closetitemId? ' + closetitemId);

      await api.post(`${URL}/api/users/${userId}/closetitems/${closetitemId}`);

      return { userId, closetitemId };
    } catch (error) {
      console.error('Error adding item reference from user:', error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        return rejectWithValue(
          (error as any).response?.data || 'Unknown error'
        );
      }
      return rejectWithValue('Unknown error');
    }
  }
);

export const removeUserClosetitemReference = createAsyncThunk<
  UserClosetitemReferencePayload, // return type
  UserClosetitemReferencePayload, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'users/removeUserItemReference',
  async ({ userId, closetitemId }, { rejectWithValue }) => {
    try {
      //console.log('inside userActions:deleteUserClosetitemReference');

      await api.delete(
        `${URL}/api/users/${userId}/closetitems/${closetitemId}`
      );

      return { userId, closetitemId };
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
