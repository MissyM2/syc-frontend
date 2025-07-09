// features/imageUpload/imageUploadSlice.js (Redux slice)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';
import { api } from '../../index.tsx';

export interface ImageUploadState {
  imageUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: ImageUploadState = {
  imageUrl: null,
  loading: false,
  error: null,
};

const URL = 'http://localhost:3000';
export const uploadImage = createAsyncThunk(
  'images/upload-image',
  async (file: File, { rejectWithValue }) => {
    console.log('inside uploadImage');
    try {
      console.log('inside try');
      const response = await api.post('/api/images/upload-image', file, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      console.log('what is response ' + JSON.stringify(response.data));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.imageUrl = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default imageUploadSlice.reducer;
