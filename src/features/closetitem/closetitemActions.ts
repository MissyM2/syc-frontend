import type { AppDispatch, RootState } from '@/app/store';
import type { Closetitem } from './closetitemInterfaces';
import type { TClosetitemList } from './closetitemTypes.ts';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../index.tsx';
//import api from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { uploadImage } from '../image/imageSlice.ts';

interface ClosetitemSubmitted {
  category: string;
  itemName: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  imageId: string;
  imageFile?: File;
  userId: string;
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

    return response.data.closetitems;
  } catch (error: any) {
    console.log('what is error? ' + error.message);
    throw error; // Re-throw other errors
  }
});

// async thunk for making the POST request
export const addClosetitemWithImageData = createAsyncThunk<
  Closetitem,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addclosetitem',
  async (closetitem: ClosetitemSubmitted, { rejectWithValue }) => {
    console.log('what is closetitem? ' + JSON.stringify(closetitem));
    try {
      //Create the closet closetitem
      const response = await api.post(
        `${URL}/api/closetitems/addclosetitem`,
        closetitem
      );

      console.log('what is response AFTER post? ' + JSON.stringify(response));

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
