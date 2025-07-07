import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

interface Closetitem {
  _id: string;
  category: string;
  itemName: string;
  season: string;
  size: string;
  desc: string;
  rating: string;
  imageFile: ImageData;
  imageId?: string;
  userId: string;
}

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

export type TClosetitemList = Closetitem[];

const URL = 'http://localhost:3000';

export const getClosetitemsByUserId = createAsyncThunk<
  Closetitem[],
  FetchClosetitemsByUserArgs,
  { rejectValue: AxiosError }
>('closetitems/getClosetitemsByUserId', async (args, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ClosetDataResponse> =
      await axiosInstance.get<ClosetDataResponse>(
        `${URL}/api/closetitems/user/${args}/closetitems`
      );

    return response.data.closetitems;
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});

// async thunk for making the POST request
export const addClosetitemWithImage = createAsyncThunk<
  //Closetitem,
  string,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addclosetitem',
  async (closetitem: ClosetitemSubmitted, { dispatch, rejectWithValue }) => {
    try {
      if (!closetitem.imageFile) {
        throw new Error('No file provided');
      }

      const imageId = closetitem.imageId;
      // closetitem.imageId = imageId;
      const imageFile = closetitem.imageFile;

      console.log('what is imageFile?. ' + JSON.stringify(imageFile));

      // Dispatch the uploadImage thunk
      const uploadResult = await dispatch(uploadImage(imageFile));

      console.log('what is upload result? .' + JSON.stringify(uploadResult));

      const imageData = await uploadImage(closetitem.imageFile);

      console.log('what is imageData? ' + imageData);
      if (uploadResult != null) {
        console.log('check if image was created.');
      }

      console.log(
        'what is closetitem before post? ' + JSON.stringify(closetitem)
      );

      // Create the closet closetitem
      // const response = await axiosInstance.post(
      //   `${URL}/api/closetitems/addclosetitem`,
      //   closetitem
      // );

      //console.log('what is response AFTER post? ' + JSON.stringify(response));
      const missy = 'missy';

      // You might want to extract the relevant data from the response before returning
      //return response.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
      return missy;
    } catch (error) {
      if (axiosInstance.isAxiosError(error)) {
        return rejectWithValue(error);
      }
      throw error; // Re-throw other errors
    }
  }
);

interface ImageUploadResponse {
  // Define the expected structure of the successful response from your API
  imageUrl: string;
  imageId: string;
}

// interface ImageUploadError {
//   message: string;
//   // ... other error details
// }

// export interface UploadImagePayload {
//   imageFile: File;
//   imageId?: string; // Optional if creating a new item
// }

export const uploadImage = createAsyncThunk<
  string,
  File,
  { rejectValue: string }
>('images/upload-image', async (imageFile, { rejectWithValue }) => {
  try {
    console.log('inside uploadImage: what is imageFile? ' + imageFile);
    const formData = new FormData();
    formData.append('image', imageFile);

    console.log('what is formData? ' + JSON.stringify(formData));

    console.log('UploadImage, inside try:  about to try to upload image ');
    const response = await axiosInstance.post<ImageUploadResponse>(
      `${URL}/api/images/upload-image`,
      formData
      // {
      //   headers: {},
      //   onUploadProgress: (progressEvent) => {
      //     // Optional: Dispatch progress updates to Redux store
      //     const percentCompleted = Math.round(
      //       (progressEvent.loaded * 100) / (progressEvent.total || 1)
      //     );
      //     console.log(`Upload Progress: ${percentCompleted}%`);
      //   },
      // }
    );

    if (!response) {
      // const errorData = await response.message();
      // return rejectWithValue(errorData.message || 'Failed to upload image');
      console.log('Failed to upload image');
    }

    console.log(
      'what is response from uploading image? ' + JSON.stringify(response.data)
    );

    return response.data.imageUrl;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to upload image'
    );
  }
});

interface UploadedImage {
  imageUrl: string;
  imageId: string;
}

export const getImage = createAsyncThunk<UploadedImage, string>( // <ReturnType, ArgType>
  'image/getImage',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<UploadedImage>(
        `${URL}/api/images/getimage/${id}`
      );
      return response.data; // Return the data part of the response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
