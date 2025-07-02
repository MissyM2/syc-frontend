import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';
import { ArrowRightSquare } from 'lucide-react';

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
  user: string;
}

interface ClosetitemSubmitted {
  category: string;
  name: string;
  seasons: string[];
  size: string;
  desc: string;
  rating: string;
  imageId: string;
  imageFile?: File;
  string: string;
}

interface ClosetDataResponse {
  closetitems: Closetitem[];
}

export interface FetchClosetitemsByUserArgs {
  userId: string;
}

export type TClosetitemList = Closetitem[];

const URL = 'http://localhost:3000';

// async thunk for making the POST request
export const addClosetitem = createAsyncThunk<
  Closetitem,
  ClosetitemSubmitted,
  { rejectValue: AxiosError }
>(
  'closetitems/addClosetitem',
  async (closetitem: ClosetitemSubmitted, { rejectWithValue }) => {
    try {
      if (!closetitem.imageFile) {
        throw new Error('No file provided');
      }

      const imageId = closetitem.imageFile.name;
      closetitem.imageId = imageId;
      const imageData = await uploadImage(closetitem.imageFile);
      if (imageData != null) {
        console.log('check if image was created.');
      }

      // Create the closet closetitem
      const response = await axios.post(
        `${URL}/api/closetitems/create-closetitem`,
        closetitem
      );

      // You might want to extract the relevant data from the response before returning
      return response.data as Closetitem; // Assuming the successful response data structure is ClosetClosetitem
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error);
      }
      throw error; // Re-throw other errors
    }
  }
);

export const getAllClosetitems = createAsyncThunk<
  Closetitem[],
  void,
  { rejectValue: AxiosError }
>('closetitems/getAllClosetitems', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<Closetitem[]> = await axios.get<Closetitem[]>(
      `${URL}/api/closetitems/allclosetitems`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});

export const getClosetitemsByUserId = createAsyncThunk<
  Closetitem[],
  FetchClosetitemsByUserArgs,
  { rejectValue: AxiosError }
>('closetitems/getClosetitemsByUserId', async (args, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<ClosetDataResponse> =
      await axios.get<ClosetDataResponse>(
        `${URL}/api/closetitems/user/${args}/closetitems`
      );

    return response.data.closetitems;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});

export const updateClosetitem = createAsyncThunk<
  Closetitem,
  Closetitem,
  { state: RootState; dispatch: AppDispatch }
>(
  'closetitems/updateClosetitem',
  async (closetitem: Closetitem, { rejectWithValue }) => {
    try {
      // Simulate an API call to update the closetitem
      const response = await fetch(`/api/closetitems/${closetitem._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(closetitem),
      });

      if (!response.ok) {
        throw new Error('Failed to update closetitem');
      }

      const updatedClosetitem = await response.json();
      return updatedClosetitem;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error);
      }
      throw error; // Re-throw other errors
    }
  }
);

export const deleteClosetitem = createAsyncThunk<
  string,
  string,
  { state: RootState; dispatch: AppDispatch }
>(
  'closetitems/deleteClosetitem',
  async (closetitemId: string, { rejectWithValue }) => {
    try {
      // Simulate an API call to delete the closetitem
      const response = await fetch(`/api/closetitems/${closetitemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete closetitem');
      }

      // Return the deleted closetitem ID
      return closetitemId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
interface ImageUploadResponse {
  // Define the expected structure of the successful response from your API
  imageUrl: string;
  imageId: string;
  // ... other relevant data
}

interface ImageUploadError {
  message: string;
  // ... other error details
}

export const uploadImage = createAsyncThunk<
  ImageUploadResponse, // This is the type of the successful return value
  File | string, // This is the type of the argument passed to the thunk (the 'file')
  { rejectValue: ImageUploadError } // This defines the type of the error payload
>('images/uploadImage', async (file: string | Blob, { rejectWithValue }) => {
  const formData = new FormData();
  formData.append('imageFile', file);

  try {
    const response = await axios.post<ImageUploadResponse>(
      `${URL}/images`,
      formData,
      {
        headers: {},
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    if (axios.isAxiosError(error)) {
      // Handle Axios-specific errors
      return rejectWithValue({
        message: error.message || 'Image upload failed',
      });
    } else {
      // Handle other potential errors
      return rejectWithValue({ message: 'An unexpected error occurred' });
    }
  }
});

// interface ImageData {
//   data: string;
// }

// export async function getImage(id: any) {
//   const response = await axiosInstance.get(`${URL}/images/${id}`);
//   return response;
// }

// Define the type for the image data
interface Image {
  id: string;
  url: string;
  // Add other image properties as needed
}

// Define the state shape for your image slice
interface ImageState {
  image: Image | null;
  loading: boolean;
  error: string | null;
}

export const getImage = createAsyncThunk<Image, string>( // <ReturnType, ArgType>
  'image/getImage',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get<Image>(`${URL}/images/${id}`);
      return response.data; // Return the data part of the response
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
