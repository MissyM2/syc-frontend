import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch, RootState } from '@/app/store';
import type {
  Closetitem,
  AddClosetitemArgs,
  ClosetDataResponse,
  DeleteClosetitemArgs,
} from '../../interfaces/closetInterfaces.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import {
  removeUserClosetitemReference,
  addUserClosetitemReference,
} from '../user/userActions.ts';

import {
  getPresignedUrlForUpload,
  uploadImageToS3,
  getPresignedUrlForDownload,
  deleteSingleImageFromS3ByUser,
} from '../../lib/images/S3Utils.ts';

const URL = 'http://localhost:3000';

// CREATE A CLOSETITEM WITH IMAGE FOR A SPECIFIC USER
export const addClosetitem = createAsyncThunk<
  Closetitem, // ReturnType: value returned by the fulfilled action's payload
  AddClosetitemArgs, // PayloadCreatorArgumentType: argument passed to the payload creator function when dispatching the thunk.
  { state: RootState; dispatch: AppDispatch; rejectValue: AxiosError } // ThunkApiConfig: an object for configuring types related to rejectWithValue, state and dispatch
>(
  'closet/addclosetitem',
  async (newClosetitem: AddClosetitemArgs, { dispatch, rejectWithValue }) => {
    try {
      // 1.  PREP THE IMAGE
      // sanitize image file name
      const originalFilename = newClosetitem.image[0].name;
      const sanitizedFilename = originalFilename.replace(/\s/g, '_');

      // add a unique identifier to the beginning of the filename
      const uniqueId = uuidv4();
      const newFilename = `${uniqueId}_${sanitizedFilename}`;

      // 2.  GET THE PRESIGNED URL FOR UPLOAD
      const presignedUrlForUploadRes = await getPresignedUrlForUpload(
        newClosetitem.userId,
        newFilename,
        newClosetitem.image[0].type
      );

      newClosetitem.imageUrl = presignedUrlForUploadRes;

      // 3. UPLOAD THE IMAGE
      await uploadImageToS3(presignedUrlForUploadRes, newClosetitem.image[0]);

      // 4. CREATE THE CLOSET ITEM IN ATLAS
      // Create a new object with all the same properties as the ClosetitemSubmitted but
      // change the image URL and the sanitized filename
      const closetitemToSend = {
        ...newClosetitem,
        imageUrl: presignedUrlForUploadRes,
        imageId: newFilename, // add this field if needed by backend
      };

      const postClosetitemToAtlasRes = await api.post(
        `${URL}/api/closet/addclosetitem`,
        closetitemToSend
      );

      const currentUserId = postClosetitemToAtlasRes.data.userId;

      const updatedClosetitem = {
        userId: currentUserId,
        closetitemId: postClosetitemToAtlasRes.data._id,
      };

      // 6. FETCH (REFRESH) CLOSETITEMS
      const fetchRes = await dispatch(fetchClosetitems(currentUserId));

      //You might want to extract the relevant data from the response before returning
      return postClosetitemToAtlasRes.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ALL CLOSETITEMS FOR SPECIFIC USER
export const fetchClosetitems = createAsyncThunk<
  Closetitem[],
  string,
  { rejectValue: AxiosError }
>('closet/fetchClosetitems', async (args, { rejectWithValue }) => {
  let tempNum = 0;
  try {
    // 1. GET ALL CLOSET ITEMS FROM ATLAS
    const getAllClosetitemsFromAtlasRes: AxiosResponse<ClosetDataResponse> =
      await api.get<ClosetDataResponse>(
        `${URL}/api/closet/user/${args}/closetitems`
      );

    // 2. GET ALL PRESIGNED URLS FOR DOWNLOAD OF IMAGES
    if (getAllClosetitemsFromAtlasRes.status === 200) {
      for (const item of getAllClosetitemsFromAtlasRes.data.closetitems) {
        if (item.imageId) {
          const getPresignedUrlResponse = await getPresignedUrlForDownload(
            item.userId,
            item.imageId
          );

          if (getPresignedUrlResponse) {
            item.imageUrl = getPresignedUrlResponse;
            tempNum += 1;
          }
        } else {
          // Handle the case where imageId is undefined
          console.warn('No imageId found for item:', item);
          // Optionally set getPresignedUrlResponse = null or handle as needed
        }
      }

      return getAllClosetitemsFromAtlasRes.data.closetitems;
    } else {
      // Always use rejectWithValue for errors/unexpected cases
      return rejectWithValue(
        new AxiosError(
          `Unexpected status: ${getAllClosetitemsFromAtlasRes.status}`
        )
      ) as any;
    }
  } catch (error: any) {
    console.log('what is error? ' + error.message);
    return rejectWithValue(error);
  }
});

// DELETE SPECIFIC CLOSETITEM

export const deleteClosetitem = createAsyncThunk<
  string,
  DeleteClosetitemArgs,
  { state: RootState; dispatch: AppDispatch }
>(
  'closet/deleteclosetitem',
  async (args: DeleteClosetitemArgs, { dispatch, rejectWithValue }) => {
    try {
      // 1. DELETE IMAGE FROM S3
      const deleteSingleImageFromS3ByUserRes =
        await deleteSingleImageFromS3ByUser(args.userId, args.imageId);

      // 2. DELETE THE CLOSETITEM FROM MongoDB

      // const deleteClosetitemResponse = await api.delete(
      const deleteClosetitemFromMongoDbRes = await api.delete(
        `${URL}/api/closet/${args.closetitemId}`
      );

      // 3. REMOVE THE _ID OF CLOSETITEM IN CLOSETITEMS ARRAY OF USER OBJECT
      const deleteClosetitemRefInUserRes = await dispatch(
        removeUserClosetitemReference({
          userId: args.userId,
          closetitemId: args.closetitemId,
        })
      );

      // 6. FETCH (REFRESH) CLOSETITEMS
      //const fetchRes = await dispatch(fetchClosetitems(args.userId));

      return args.closetitemId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle Axios specific errors
        return rejectWithValue(
          error.response?.data?.message || 'Failed to delete item'
        );
      }
      return rejectWithValue('An unknown error occurred'); //
    }
  }
);
