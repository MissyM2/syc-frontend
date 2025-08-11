import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import type { AppDispatch, RootState } from '@/app/store';
import type {
  IClosetitem,
  IAddClosetitem,
  IUpdateClosetitem,
  IDeleteClosetitem,
  IReadClosetitem,
  IReadClosetitemsQueryParams,
} from '../../interfaces/closetTypes.ts';
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
  IClosetitem, // ReturnType: value returned by the fulfilled action's payload
  IAddClosetitem, // PayloadCreatorArgumentType: argument passed to the payload creator function when dispatching the thunk.
  { state: RootState; rejectValue: AxiosError } // ThunkApiConfig: an object for configuring types related to rejectWithValue, state and dispatch
>(
  'closet/addclosetitem',
  async (newClosetitem: IAddClosetitem, { rejectWithValue }) => {
    try {
      // 1.  PREP THE IMAGE
      // sanitize image file name
      const originalFilename = newClosetitem.imageFile[0].name;
      const sanitizedFilename = originalFilename.replace(/\s/g, '_');

      // add a unique identifier to the beginning of the filename
      const uniqueId = uuidv4();
      const newFilename = `${uniqueId}_${sanitizedFilename}`;

      // 2.  GET THE PRESIGNED URL FOR UPLOAD
      const presignedUrlForUploadRes = await getPresignedUrlForUpload(
        newClosetitem.userId,
        newFilename,
        newClosetitem.imageFile[0].type
      );

      // 3. UPLOAD THE IMAGE
      await uploadImageToS3(
        presignedUrlForUploadRes,
        newClosetitem.imageFile[0]
      );

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

      return postClosetitemToAtlasRes.data as IClosetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// CREATE A CLOSETITEM WITH IMAGE FOR A SPECIFIC USER
export const updateClosetitem = createAsyncThunk<
  IClosetitem,
  IUpdateClosetitem,
  { state: RootState; rejectValue: string } // ThunkApiConfig: an object for configuring types related to rejectWithValue, state and dispatch
>(
  'closet/updateclosetitem',
  async (updatedClosetitem: IUpdateClosetitem, { rejectWithValue }) => {
    try {
      console.log(
        'updateClosetitem called with:',
        JSON.stringify(updatedClosetitem.imageId)
      );

      if (!updatedClosetitem._id || !updatedClosetitem.userId) {
        return rejectWithValue('Missing required fields: _id or userId');
      }

      console.log('what is updatedClosetitem:', updatedClosetitem);

      // IF THE IMAGE FILE IS DIRTY, HANDLE THE NEW IMAGE FILE
      if (
        !updatedClosetitem.imageFile ||
        updatedClosetitem.imageFile.length === 0
      ) {
        return rejectWithValue('Image file is required');
      }

      // 1.  PREP THE IMAGE
      // sanitize image file name
      const originalFilename = updatedClosetitem.imageFile?.[0]?.name;
      const sanitizedFilename = originalFilename.replace(/\s/g, '_');

      // add a unique identifier to the beginning of the filename
      const uniqueId = uuidv4();
      const newFilename = `${uniqueId}_${sanitizedFilename}`;

      // 2.  GET THE PRESIGNED URL FOR UPLOAD
      const presignedUrlForUploadRes = await getPresignedUrlForUpload(
        updatedClosetitem.userId,
        newFilename,
        updatedClosetitem.imageFile[0].type
      );

      // 3. UPLOAD THE IMAGE
      await uploadImageToS3(
        presignedUrlForUploadRes,
        updatedClosetitem.imageFile[0]
      );

      // 4. GET PRESIGNED IMAGE FOR DOWNLOAD
      const getPresignedUrlForDownloadRes = await getPresignedUrlForDownload(
        updatedClosetitem.userId,
        newFilename
      );

      if (getPresignedUrlForDownloadRes) {
        updatedClosetitem.imageUrl = getPresignedUrlForDownloadRes;
      }

      // Now, that you have the presigned URL for download, you can safely delete the old image from S3

      await deleteSingleImageFromS3ByUser(
        updatedClosetitem.userId,
        updatedClosetitem.imageId
      );
      console.log('deleteClosetitem, after delete image');

      // 4. CREATE THE CLOSET ITEM IN ATLAS
      // Create a new object with all the same properties as the ClosetitemSubmitted but
      // change the image URL and the sanitized filename
      const closetitemToSend = {
        ...updatedClosetitem,
        imageUrl: getPresignedUrlForDownloadRes,
        imageId: newFilename, // add this field if needed by backend
      };

      console.log(
        'what is closetitemToSend?',
        JSON.stringify(closetitemToSend)
      );

      const response = await api.put<IClosetitem>(
        `${URL}/api/closet/update-closetitem/${updatedClosetitem._id}`,
        closetitemToSend
      );

      return response.data as IClosetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error: any) {
      console.log('Error in updateClosetitem:', error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// GET ALL CLOSETITEMS FOR SPECIFIC USER
export const fetchClosetitems = createAsyncThunk<
  IClosetitem[],
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
  IDeleteClosetitem,
  { state: RootState; dispatch: AppDispatch; rejectValue: AxiosError }
>(
  'closet/deleteclosetitem',
  async (args: IDeleteClosetitem, { dispatch, rejectWithValue }) => {
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

// CREATE A CLOSETITEM WITH IMAGE FOR A SPECIFIC USER
// export const updateClosetitemImage = createAsyncThunk<
//   IClosetitem,
//   IUpdateClosetitem,
//   { state: RootState; rejectValue: AxiosError } // ThunkApiConfig: an object for configuring types related to rejectWithValue, state and dispatch
// >(
//   'closet/updateclosetitemproperty',
//   async (
//     updatedClosetitemImage: IUpdateClosetitemImage,
//     { rejectWithValue }
//   ) => {
//     try {
//       // compare current imageID with the new imageID
//       const response = await api.put<IClosetitem>(
//         `${URL}/api/closet/update-closetitem/${updatedClosetitem._id}`,
//         updatedClosetitem
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//     //   try {
//     //     // 1.  PREP THE IMAGE
//     //     // sanitize image file name
//     //     const originalFilename = updatedClosetitem.imageFile[0].name;
//     //     const sanitizedFilename = originalFilename.replace(/\s/g, '_');

//     //     // add a unique identifier to the beginning of the filename
//     //     const uniqueId = uuidv4();
//     //     const newFilename = `${uniqueId}_${sanitizedFilename}`;

//     //     // 2.  GET THE PRESIGNED URL FOR UPLOAD
//     //     const presignedUrlForUploadRes = await getPresignedUrlForUpload(
//     //       newClosetitem.userId,
//     //       newFilename,
//     //       newClosetitem.imageFile[0].type
//     //     );

//     //     // 3. UPLOAD THE IMAGE
//     //     await uploadImageToS3(
//     //       presignedUrlForUploadRes,
//     //       newClosetitem.imageFile[0]
//     //     );

//     //     // 4. GET PRESIGNED IMAGE FOR DOWNLOAD
//     //     const getPresignedUrlForDownloadRes = await getPresignedUrlForDownload(
//     //       newClosetitem.userId,
//     //       newFilename
//     //     );

//     //     if (getPresignedUrlForDownloadRes) {
//     //       newClosetitem.imageUrl = getPresignedUrlForDownloadRes;
//     //     }

//     //     // 4. CREATE THE CLOSET ITEM IN ATLAS
//     //     // Create a new object with all the same properties as the ClosetitemSubmitted but
//     //     // change the image URL and the sanitized filename
//     //     const closetitemToSend = {
//     //       ...newClosetitem,
//     //       imageUrl: getPresignedUrlForDownloadRes,
//     //       imageId: newFilename, // add this field if needed by backend
//     //     };

//     //     const postClosetitemToAtlasRes = await api.post(
//     //       `${URL}/api/closet/addclosetitem`,
//     //       closetitemToSend
//     //     );

//     //     return postClosetitemToAtlasRes.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
//     //   } catch (error: any) {
//     //     return rejectWithValue(error.response.data);
//     //   }
//   }
// );
