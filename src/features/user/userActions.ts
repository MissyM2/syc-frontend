import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import type {
  User,
  UserClosetitemReferenceReturn,
  UserClosetitemReferenceArgs,
} from '../../interfaces/userInterfaces.ts';
import type { DeleteClosetitemArgs } from '../../interfaces/closetInterfaces.ts';

const URL = 'http://localhost:3000';

export const addUserClosetitemReference = createAsyncThunk<
  UserClosetitemReferenceReturn, // return type
  UserClosetitemReferenceArgs, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'closet/addUserItemReference',
  async (args: UserClosetitemReferenceArgs, { dispatch, rejectWithValue }) => {
    try {
      //console.log('inside userActions:addUserClosetitemReference');
      // 1. ADD CLOSETITEM ID to USER.CLOSETITEMS ARRAY
      const closetitemIdToAdd = args.closetitemId;
      // console.log(
      //   'inside userActions:addUserClosetitemReference: itemId ' +
      //     closetitemIdToAdd
      // );

      const putAddUserClosetitemRefRes = await api.put(
        `${URL}/api/users/${args.userId}/closetitems/${args.closetitemId}`,
        { closetitemId: closetitemIdToAdd }
      );

      // console.log(
      //   '1. ADD CLOSETITEM ID to USER.CLOSETITEMS ARRAY is completed'
      // );

      return putAddUserClosetitemRefRes.data as UserClosetitemReferenceReturn;
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
  UserClosetitemReferenceReturn, // return type
  UserClosetitemReferenceArgs, // argument type
  { state: RootState; dispatch: AppDispatch } // thunk API config
>(
  'users/removeUserItemReference',
  async (args: UserClosetitemReferenceArgs, { rejectWithValue }) => {
    try {
      console.log('inside userActions:deleteUserClosetitemReference');

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
