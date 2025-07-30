import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';

import type {
  User,
  UserClosetitemReferenceReturn,
  UserClosetitemReferenceArgs,
} from '../../interfaces/userInterfaces.ts';

const URL = 'http://localhost:3000';

export const removeUserClosetitemReference = createAsyncThunk<
  UserClosetitemReferenceReturn, // return type
  UserClosetitemReferenceArgs, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'users/removeUserItemReference',
  async (args: UserClosetitemReferenceArgs, { rejectWithValue }) => {
    try {
      const postAddUserClosetitemRefRes = await api.delete(
        `${URL}/api/users/${args.userId}/closetitems/${args.closetitemId}`
      );

      return postAddUserClosetitemRefRes.data as UserClosetitemReferenceReturn;
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
