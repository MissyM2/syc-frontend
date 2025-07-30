import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type {
  Closetitem,
  ClosetState,
} from '../../interfaces/closetInterfaces';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  fetchClosetitems,
  addClosetitem,
  //updateClosetitem,
  deleteClosetitem,
} from './closetActions';

const initialState: ClosetState = {
  closetitems: [] as Closetitem[],
  status: 'idle',
  error: null,
  success: false,
};

const closetSlice = createSlice({
  name: 'closet',
  initialState,
  reducers: {
    clearClosetitems: (state) => {
      state.closetitems = [];
    },
    resetSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addClosetitem.pending, (state) => {
        state.status = 'loading';

        state.error = null;
      })
      .addCase(
        addClosetitem.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          //state.closetitems.push(action.payload);
          state.status = 'idle';
        }
      )
      .addCase(addClosetitem.rejected, (state, action) => {
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
          Object.assign(state, initialState);
          // console.log(
          //   'what is state.closetitems? ' + JSON.stringify(state.closetitems)
          // );

          state.closetitems = action.payload;
          // console.log(
          //   'what is state.closetitems AFTER FETCH? ' +
          //     JSON.stringify(state.closetitems)
          // );
        }
      )
      .addCase(fetchClosetitems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Unknown error';
      })

      .addCase(deleteClosetitem.pending, (state) => {
        // Pending state when deletion starts
        state.status = 'loading';
      })
      .addCase(
        deleteClosetitem.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = 'succeeded';
          state.closetitems = state.closetitems.filter(
            (item) => item._id !== action.payload
          );
        }
      )
      .addCase(deleteClosetitem.rejected, (state, action) => {
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

export const { clearClosetitems, resetSlice } = closetSlice.actions;
export default closetSlice.reducer;
