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
export const addClosetitemWithImage = createAsyncThunk<
  Closetitem,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addclosetitem',
  async (itemData: ClosetitemSubmitted, thunkAPI) => {
    console.log('inside addClosetitem');
    let imageUrl: string | undefined;
    // thunkAPI includes dispatch and getState
    // Dispatch the uploadImage thunk
    if (itemData.imageFile) {
      if (itemData.imageFile) {
        const uploadResult = await thunkAPI.dispatch(
          uploadImage(itemData.imageFile)
        );
        // Check if the upload was successful and extract the payload
        if (uploadResult.meta.requestStatus === 'fulfilled') {
          imageUrl = uploadResult.payload as string;
        } else {
          // Handle upload failure
          throw new Error('Image upload failed');
        }
      }

      // Simulate API call for adding item with the image URL
      const newItem = await new Promise<any>((resolve) => {
        setTimeout(() => {
          resolve({ id: Date.now(), name: itemData.imageId, imageUrl });
        }, 500);
      });

      return newItem;
    }
  }
);
//async (closetitem: ClosetitemSubmitted, { dispatch, rejectWithValue }) => {

// try {
//   if (!closetitem.imageFile) {
//     throw new Error('No file provided');
//   }

//   const imageId = closetitem.imageId;
//   // closetitem.imageId = imageId;
//   const imageFile = closetitem.imageFile;

//   console.log('MISSY:what is imageFile?. ' + JSON.stringify(imageFile));

//   // Dispatch the uploadImage thunk
//   const uploadResult = await dispatch(uploadImage({ imageFile }));
//   if (uploadResult != null) {
//     console.log('there is imageData');
//   } else {
//     console.log('there is no image Data');
//   }

//console.log('what is upload result? .' + JSON.stringify(uploadResult));

// const imageData = await uploadImage(closetitem.imageFile);
// if (imageData != null) {
//   console.log('there is imageData');
// } else {
//   console.log('there is no image Data');
// }

// if (uploadResult != null) {
//   console.log('check if image was created.');
// }

// console.log(
//   'what is closetitem before post? ' + JSON.stringify(closetitem)
// );

// Create the closet closetitem
// const response = await api.post(
//   `${URL}/api/closetitems/addclosetitem`,
//   closetitem
// );

//console.log('what is response AFTER post? ' + JSON.stringify(response));

// You might want to extract the relevant data from the response before returning
//   return response.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
// } catch (error: any) {
//   // if (api.isAxiosError(error)) {
//   //   return rejectWithValue(error);
//   // }
//   console.log('what is error? ' + error.message);
//   throw error; // Re-throw other errors
// }
//   }
// );

// interface ImageUploadResponse {
//   // Define the expected structure of the successful response from your API
//   imageUrl: string;
//   imageId: string;
// }

// interface ImageUploadError {
//   message: string;
//   // ... other error details
// }

// export interface UploadImagePayload {
//   imageFile: File;
//   imageId?: string; // Optional if creating a new item
// }

// interface UploadImageArgs {
//   imageFile: File;
// }

// interface UploadImageResponse {
//   imageUrl: string;
// }

// export const uploadImage = createAsyncThunk<
//   UploadImageResponse,
//   UploadImageArgs
// >('images/upload-image', async ({ imageFile }) => {
//   // try {
//   console.log('inside uploadImage: what is imageFile? ' + imageFile);
//   const formData = new FormData();
//   formData.append('imageFile', imageFile);

//   const response = await api.post<UploadImageResponse>(
//     `${URL}/api/images/uploadimage`,
//     formData,
//     {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//       // onUploadProgress: (progressEvent) => {
//       //   // Optional: Dispatch progress updates to Redux store
//       //   const percentCompleted = Math.round(
//       //     (progressEvent.loaded * 100) / (progressEvent.total || 1)
//       //   );
//       //   console.log(`Upload Progress: ${percentCompleted}%`);
//       // },
//     }
//   );

//   if (!response) {
//     // const errorData = await response.message();
//     // return rejectWithValue(errorData.message || 'Failed to upload image');
//     console.log('Failed to upload image');
//   }

//   console.log(
//     'what is response from uploading image? ' + JSON.stringify(response.data)
//   );
//   const imageData = await response.data;

//   return imageData;
//   // } catch (error: any) {
//   //   console.log('there is an error: ' + error);
//   // }
// });

// interface UploadedImage {
//   imageUrl: string;
//   imageId: string;
// }

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
