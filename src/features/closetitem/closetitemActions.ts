import type { AppDispatch, RootState } from '@/app/store';
import type { Closetitem } from './closetitemInterfaces';
import type { TClosetitemList } from './closetitemTypes.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
//import api from 'axios';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
//import { uploadImage } from '../image/imageSlice.ts';
import {
  getPresignedUrl,
  uploadImageToS3,
  getPresignedUrlForDownload,
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
  closetitems: Closetitem[];
}

export interface FetchClosetitemsByUserArgs {
  userId: string;
}

const URL = 'http://localhost:3000';

export const getClosetitemsByUserId = createAsyncThunk<
  Closetitem[],
  FetchClosetitemsByUserArgs,
  { rejectValue: AxiosError }
>('closetitems/getClosetitemsByUserId', async (args, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ClosetDataResponse> =
      await api.get<ClosetDataResponse>(
        `${URL}/api/closetitems/user/${args}/closetitems`
      );

    if (response.status === 200) {
      for (const item of response.data.closetitems) {
        if (item.imageId) {
          const getPresignedUrlResponse = await getPresignedUrlForDownload(
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
    return rejectWithValue(error); // Use rejectWithValue for errors
  }
});

export async function getImage(id: any) {
  try {
    const response = await api.get(`${URL}/api/images/sycstorage/${id}`, {
      responseType: 'arraybuffer',
    });
    const imageBuffer = Buffer.from(response.data);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = response.headers['content-type']; // Get the content type from S3
    return `data:${mimeType};base64,${base64Image}`;

    //return response.data;
  } catch (error) {
    console.error('Error fetching image from S3:', error);
    return null;
  }
}

// async thunk for making the POST request
export const addClosetitemWithImageData = createAsyncThunk<
  Closetitem,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addclosetitem',
  async (closetitem: ClosetitemSubmitted, { rejectWithValue }) => {
    try {
      // get the presigned url
      const getPresignedUrlResponse = await getPresignedUrl(
        closetitem.image[0].name,
        closetitem.image[0].type
      );

      closetitem.imageUrl = getPresignedUrlResponse;

      // upload image

      await uploadImageToS3(getPresignedUrlResponse, closetitem.image[0]);

      //Create the closet closetitem
      const response = await api.post(
        `${URL}/api/closetitems/addclosetitem`,
        closetitem
      );

      //You might want to extract the relevant data from the response before returning
      return response.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const getImage = createAsyncThunk<UploadedImage, string>( // <ReturnType, ArgType>
//   'image/getImage',
//   async (id: string, { rejectWithValue }) => {
//     try {
//       const response = await api.get<UploadedImage>(
//         `${URL}/api/images/getimage/${id}`
//       );
//       return response.data; // Return the data part of the response
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );
