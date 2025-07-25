import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type {
  Closetitem,
  ClosetState,
} from '../../interfaces/closetitemInterfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  fetchClosetitems,
  addClosetitemWithImageData,
  //updateClosetitem,
  deleteClosetitemAndImageData,
} from './closetitemActions';

const initialState: ClosetState = {
  closetitems: [],
  status: 'idle',
  error: null,
  success: false,
};

const closetitemSlice = createSlice({
  name: 'closet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClosetitemWithImageData.pending, (state) => {
        state.status = 'loading';
        // console.log(
        //   'inside closetitem slice what is state. status? ' + state.status
        // );
        state.error = null;
      })
      .addCase(
        addClosetitemWithImageData.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.closetitems.push(action.payload);
          console.log(
            'inside addClosetitemWithImageData.fulfilled. state.closetitems.length: ' +
              state.closetitems.length
          );
        }
      )
      .addCase(addClosetitemWithImageData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(fetchClosetitems.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchClosetitems.fulfilled,
        (state, action: PayloadAction<Closetitem[]>) => {
          state.status = 'succeeded';
          console.log(
            'inside fetchClosetitems.fulfilled. state.closetitems.length:' +
              state.closetitems.length
          );
          state.closetitems = action.payload;
        }
      )
      .addCase(fetchClosetitems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(deleteClosetitemAndImageData.pending, (state) => {
        // Pending state when deletion starts
        state.status = 'loading';
      })
      .addCase(
        deleteClosetitemAndImageData.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.closetitems = state.closetitems.filter(
            (item) => item._id !== action.payload
          );

          console.log(
            'inside deleteClosetitemAndImageData.fulfilled. state.closetitems.length: ' +
              state.closetitems.length
          );
        }
      )
      .addCase(deleteClosetitemAndImageData.rejected, (state, action) => {
        // Rejected state when deletion fails
        state.status = 'failed';
        if (
          action.payload &&
          typeof action.payload === 'object' &&
          'message' in action.payload
        ) {
          // If payload is an AxiosError, use its message
          state.error =
            (action.payload as AxiosError).message || 'Something went wrong';
        } else if (typeof action.payload === 'string') {
          state.error = action.payload;
        } else {
          state.error = action.error.message || 'Something went wrong';
        }
      });
  },
});

export default closetitemSlice.reducer;
