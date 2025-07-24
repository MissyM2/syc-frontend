import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { Closetitem, ClosetState } from './closetitemInterfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  getClosetitemsByUserId,
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
  name: 'closetitem',
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
          console.log(
            'what does the state.closetitems look like? ' +
              state.closetitems.length
          );
          state.closetitems.push(action.payload);
          console.log(
            'what does the state.closetitems look like AFTER push? ' +
              state.closetitems.length
          );
        }
      )
      .addCase(addClosetitemWithImageData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(getClosetitemsByUserId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        getClosetitemsByUserId.fulfilled,
        (state, action: PayloadAction<Closetitem[]>) => {
          state.status = 'succeeded';
          state.closetitems = action.payload;
        }
      )
      .addCase(getClosetitemsByUserId.rejected, (state, action) => {
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
          ); // Remove the deleted item from the state
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
