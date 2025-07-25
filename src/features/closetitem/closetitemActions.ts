import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch, RootState } from '@/app/store';
import type {
  Closetitem,
  DeleteClosetitemArgs,
} from '../../interfaces/closetitemInterfaces.ts';
import type { TClosetitemList } from '../../interfaces/closetitemTypes.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
import axios from 'axios';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import {
  removeUserClosetitemReference,
  addUserClosetitemReference,
} from '../user/userActions.ts';
import type { UserClosetitemReferencePayload } from '../../interfaces/userInterfaces.ts';

import {
  getPresignedUrlForUpload,
  uploadImageToS3,
  getPresignedUrlForDownload,
  deleteSingleImageFromS3ByUser,
} from '../../lib/images/S3Utils.ts';

interface ClosetitemSubmitted {
  userId: string;
  category: string;
  itemName: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  imageId: string;
  image: FileList;
  imageUrl: string;
}

interface ClosetDataResponse {
  closetitems: TClosetitemList;
}

const URL = 'http://localhost:3000';

// create a closetitem, with image, for a specific user
export const addClosetitemWithImageData = createAsyncThunk<
  Closetitem,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addclosetitem',
  async (closetitem: ClosetitemSubmitted, { dispatch, rejectWithValue }) => {
    try {
      // sanitize image file name
      const originalFilename = closetitem.image[0].name;
      const sanitizedFilename = originalFilename.replace(/\s/g, '_');

      // add a unique identifier to the beginning of the filename
      const uniqueId = uuidv4();
      const newFilename = `${uniqueId}_${sanitizedFilename}`;

      // change original file name to sanitized version so it is uploaded to mongodb
      // get the presigned url
      const getPresignedUrlResponse = await getPresignedUrlForUpload(
        closetitem.userId,
        //closetitem.image[0].name,
        newFilename,
        closetitem.image[0].type
      );

      closetitem.imageUrl = getPresignedUrlResponse;

      // 1. upload image

      await uploadImageToS3(getPresignedUrlResponse, closetitem.image[0]);

      // 2. Create the closet closetitem

      // Create a new object with all the same properties as the ClosetitemSubmitted but
      // change the image URL and the sanitized filename
      const closetitemToSend = {
        ...closetitem,
        imageUrl: getPresignedUrlResponse,
        imageId: newFilename, // add this field if needed by backend
      };

      console.log(
        'what is closetitemToSend? ' + JSON.stringify(closetitemToSend)
      );
      const response = await api.post(
        `${URL}/api/closetitems/addclosetitem`,
        closetitemToSend
      );

      //onst newClosetitem: Closetitem = response.data;
      //console.log('what is newClosetitem? ' + JSON.stringify(newClosetitem));
      const newClosetitem: UserClosetitemReferencePayload = {
        userId: response.data.userId,
        closetitemId: response.data._id,
      };

      // 3. add closet item Id to User
      await dispatch(addUserClosetitemReference(newClosetitem));

      //You might want to extract the relevant data from the response before returning
      return response.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get all closetitems for a specific user
export const fetchClosetitems = createAsyncThunk<
  Closetitem[],
  string,
  { rejectValue: AxiosError }
>('closetitems/fetchClosetitems', async (args, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ClosetDataResponse> =
      await api.get<ClosetDataResponse>(
        `${URL}/api/closetitems/user/${args}/closetitems`
      );

    if (response.status === 200) {
      for (const item of response.data.closetitems) {
        if (item.imageId) {
          const getPresignedUrlResponse = await getPresignedUrlForDownload(
            item.userId,
            item.imageId
          );

          if (getPresignedUrlResponse) {
            item.imageUrl = getPresignedUrlResponse;
          }
        } else {
          // Handle the case where imageId is undefined
          console.warn('No imageId found for item:', item);
          // Optionally set getPresignedUrlResponse = null or handle as needed
        }
      }
      return response.data.closetitems;
    } else {
      // Always use rejectWithValue for errors/unexpected cases
      return rejectWithValue(
        new AxiosError(`Unexpected status: ${response.status}`)
      ) as any;
    }
  } catch (error: any) {
    console.log('what is error? ' + error.message);
    return rejectWithValue(error);
  }
});

// delete specific closetitem

export const deleteClosetitemAndImageData = createAsyncThunk<
  string,
  DeleteClosetitemArgs,
  { state: RootState; dispatch: AppDispatch }
>(
  'closetitems/deleteclosetitem',
  async (args: DeleteClosetitemArgs, { dispatch, rejectWithValue }) => {
    //console.log('inside deleteClosetitemAndImageData');
    //const userId = getState().auth.userInfo._id;

    try {
      //const userId = getState().auth.userInfo._id;

      // 1. delete image from S3 first
      const deleteImageResponse = await deleteSingleImageFromS3ByUser(
        args.userId,
        args.imageId
      );
      //console.log('After Deleting item: 1.deleteSingleImageFromS3ByUser');

      // 2. delete the closetitem from MongoDB

      const deleteClosetitemResponse = await api.delete(
        `${URL}/api/closetitems/${args.closetitemId}`
      );
      //console.log('After Deleting item: 2. after deletion of closetitem.');

      // 3. update the array in the user object to remove the item with args.closetitemId
      const deleteClosetitemRefResponse = await dispatch(
        removeUserClosetitemReference({
          userId: args.userId,
          closetitemId: args.closetitemId,
        })
      );
      //console.log('After Deleting item: 3. after update of user array.');

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
