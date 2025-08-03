import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../index.tsx';
import axios from 'axios';
import { AxiosError } from 'axios';
import { fetchClosetitems } from '@/features/closet/closetActions';

import type {
  User,
  UserState,
  //AuthState,
  AuthLoginArgs,
  UserClosetitemReferenceReturn,
  UserClosetitemReferenceArgs,
  RegistrationSubmissionArgs,
} from '../../interfaces/userInterfaces.ts';

import {
  getPresignedUrlForUpload,
  uploadImageToS3,
  getPresignedUrlForDownload,
  //deleteSingleImageFromS3ByUser,
} from '@/utils/S3Utils.ts';
import { ClosetitemCard } from '@/components/ClosetitemCard.tsx';

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
export const registerUser = createAsyncThunk<
  User,
  RegistrationSubmissionArgs,
  { state: RootState; dispatch: AppDispatch; rejectValue: AxiosError }
>(
  'auth/register',
  async (
    newUser: RegistrationSubmissionArgs,
    { dispatch, rejectWithValue }
  ) => {
    try {
      // 1. CREATE USER IN ATLAS
      let newUserId = '';
      const userToSend = {
        userName: newUser.userName,
        email: newUser.email,
        homeAddress: newUser.homeAddress,
        password: newUser.password,
        userRole: newUser.userRole,
        profileImageId: '',
        //profileImage: null,
        profileImageUrl: '',
        closetitems: [],
      };

      const postUserToAtlasRes = await axios.post(`${URL}/api/users/register`, {
        userToSend,
      });

      if (postUserToAtlasRes) {
        newUserId = postUserToAtlasRes.data._id;
      }

      // // 2.  PREP THE IMAGE
      // // sanitize image file name
      // const originalFilename = newUser.profileImage[0].name;
      // const sanitizedFilename = originalFilename.replace(/\s/g, '_');

      // // add a unique identifier to the beginning of the filename
      // const uniqueId = uuidv4();
      // const newFilename = `${uniqueId}_profileImage_${sanitizedFilename}`;
      // // 2.  GET THE PRESIGNED URL FOR UPLOAD
      // const presignedUrlForUploadRes = await getPresignedUrlForUpload(
      //   newUserId,
      //   newFilename,
      //   newUser.profileImage[0].type
      // );

      // // 3. UPLOAD THE IMAGE
      // await uploadImageToS3(presignedUrlForUploadRes, newUser.profileImage[0]);

      // // 4. GET PRESIGNED IMAGE FOR DOWNLOAD
      // const getPresignedUrlForDownloadRes = await getPresignedUrlForDownload(
      //   newUserId,
      //   newFilename
      // );

      // if (getPresignedUrlForDownloadRes) {
      //   newUser.profileImageUrl = getPresignedUrlForDownloadRes;
      // }
      // // 5. UPDATE USER IN ATLAS WITH IMAGE URL
      // const response = await axios.put(`/api/users/${newUserId}`, newUser);
      return postUserToAtlasRes.data as User;
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
