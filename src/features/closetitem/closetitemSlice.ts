import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import type { Closetitem, ClosetState } from './closetitemInterfaces';
import type { TClosetitemList } from './closetitemTypes.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  getClosetitemsByUserId,
  addClosetitemWithImageData,
  //updateClosetitem,
  deleteClosetitemAndImageData,
} from './closetitemActions';

// initialize userToken from local storage
// const userToken = sessionStorage.getItem('userToken')
//   ? sessionStorage.getItem('userToken')
//   : null;

// Define the initial state using that type
const initialState: ClosetState = {
  closetitems: [],
  status: 'idle',
  error: null,
  success: false,
};

const closetitemSlice = createSlice({
  name: 'closetitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(getAllClosetitems.pending, (state) => {
      //   state.status = true;
      //   state.error = null;
      // })
      // .addCase(
      //   getAllClosetitems.fulfilled,
      //   (state, action: PayloadAction<Closetitem[]>) => {
      //     state.status = false;
      //     state.closetitems = action.payload;
      //   }
      // )
      // .addCase(getAllClosetitems.rejected, (state, action) => {
      //   state.status = false;
      //   state.error = action.error.message || 'Failed to fetch users';
      // })
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
      .addCase(addClosetitemWithImageData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        addClosetitemWithImageData.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.closetitems.push(action.payload);
        }
      )
      .addCase(addClosetitemWithImageData.rejected, (state, action) => {
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
          // Fulfilled state when deletion succeeds
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
    // .addCase(updateClosetitem.pending, (state) => {
    //   state.status = true;
    //   state.error = null;
    // })
    // .addCase(
    //   updateClosetitem.fulfilled,
    //   (state, action: PayloadAction<Closetitem>) => {
    //     state.status = false;
    //     const updatedClosetitem = action.payload;
    //     const index = state.closetitems.findIndex(
    //       (closetitem) => closetitem._id === updatedClosetitem._id
    //     );
    //     if (index !== -1) {
    //       state.closetitems[index] = updatedClosetitem;
    //     }
    //   }
    // )
    // .addCase(updateClosetitem.rejected, (state, action) => {
    //   state.status = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(deleteClosetitemAndImageData.pending, (state) => {
    //   state.status = true;
    //   state.error = null;
    // })
    // .addCase(
    //   deleteClosetitemAndImageData.fulfilled,
    //   (state, action: PayloadAction<string>) => {
    //     state.status = false;
    //     const deletedClosetitemId = action.payload;
    //     state.closetitems = state.closetitems.filter(
    //       (closetitem) => closetitem._id !== deletedClosetitemId
    //     );
    //   }
    // )
    // .addCase(deleteClosetitemAndImageData.rejected, (state, action) => {
    //   state.status = false;
    //   state.error = action.payload as string;
    // });
  },
});

export default closetitemSlice.reducer;
