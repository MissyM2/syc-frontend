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
  //addUserClosetitemReference,
} from '../user/userActions.ts';

import {
  getPresignedUrlForUpload,
  uploadImageToS3,
  getPresignedUrlForDownload,
  deleteSingleImageFromS3ByUser,
} from '@/utils/S3Utils.ts';

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

      //newClosetitem.imageUrl = presignedUrlForUploadRes;

      // 3. UPLOAD THE IMAGE
      await uploadImageToS3(presignedUrlForUploadRes, newClosetitem.image[0]);

      // 4. GET PRESIGNED IMAGE FOR DOWNLOAD
      const getPresignedUrlForDownloadRes = await getPresignedUrlForDownload(
        newClosetitem.userId,
        newFilename
      );

      if (getPresignedUrlForDownloadRes) {
        newClosetitem.imageUrl = getPresignedUrlForDownloadRes;
      }

      // 4. CREATE THE CLOSET ITEM IN ATLAS
      // Create a new object with all the same properties as the ClosetitemSubmitted but
      // change the image URL and the sanitized filename
      const closetitemToSend = {
        ...newClosetitem,
        imageUrl: getPresignedUrlForDownloadRes,
        imageId: newFilename, // add this field if needed by backend
      };

      const postClosetitemToAtlasRes = await api.post(
        `${URL}/api/closet/addclosetitem`,
        closetitemToSend
      );

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
  try {
    // 1. GET ALL CLOSET ITEMS FROM ATLAS
    const allClosetitemsFromAtlasRes: AxiosResponse<ClosetDataResponse> =
      await api.get<ClosetDataResponse>(
        `${URL}/api/closet/user/${args}/closetitems`
      );

    // 2. GET PRESIGNED URLS FOR DOWNLOAD OF IMAGES AND UPDATE allClosetitemsFromAtlasRes
    if (allClosetitemsFromAtlasRes.status === 200) {
      for (const item of allClosetitemsFromAtlasRes.data.closetitems) {
        if (item.imageId) {
          const presignedUrlRes = await getPresignedUrlForDownload(
            item.userId,
            item.imageId
          );

          if (presignedUrlRes) {
            item.imageUrl = presignedUrlRes;
          }
        } else {
          console.warn('No imageId found for item:', item);
        }
      }

      return allClosetitemsFromAtlasRes.data.closetitems;
    } else {
      // Always use rejectWithValue for errors/unexpected cases
      return rejectWithValue(
        new AxiosError(
          `Unexpected status: ${allClosetitemsFromAtlasRes.status}`
        )
      ) as any;
    }
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

// DELETE SPECIFIC CLOSETITEM
export const deleteClosetitem = createAsyncThunk<
  string,
  DeleteClosetitemArgs,
  { state: RootState; dispatch: AppDispatch; rejectValue: AxiosError }
>(
  'closet/deleteclosetitem',
  async (args: DeleteClosetitemArgs, { dispatch, rejectWithValue }) => {
    try {
      // 1. DELETE IMAGE FROM S3
      await deleteSingleImageFromS3ByUser(args.userId, args.imageId);
      console.log('deleteClosetitem, after delete image');

      // 2. DELETE THE CLOSETITEM FROM MongoDB
      await api.delete(`${URL}/api/closet/${args.closetitemId}`);

      console.log('deleteClosetitem, after delete item from atlas');

      // 3. REMOVE THE _ID OF CLOSETITEM IN CLOSETITEMS ARRAY OF USER OBJECT
      await dispatch(
        removeUserClosetitemReference({
          userId: args.userId,
          closetitemId: args.closetitemId,
        })
      );

      console.log('deleteClosetitem, after remove closeitemreference');

      return args.closetitemId;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
