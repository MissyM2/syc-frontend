import { createSlice } from '@reduxjs/toolkit';
import type { Closetitem, ClosetitemsState } from './closetitemInterfaces';
import type { TClosetitemList } from './closetitemTypes.ts';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  getClosetitemsByUserId,
  addClosetitemWithImage,
  //updateClosetitem,
  //deleteClosetitem,
} from './closetitemActions';

// initialize userToken from local storage
// const userToken = sessionStorage.getItem('userToken')
//   ? sessionStorage.getItem('userToken')
//   : null;

// Define the initial state using that type
const initialState: ClosetitemsState = {
  closetitems: [],
  loading: false,
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
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(
      //   getAllClosetitems.fulfilled,
      //   (state, action: PayloadAction<Closetitem[]>) => {
      //     state.loading = false;
      //     state.closetitems = action.payload;
      //   }
      // )
      // .addCase(getAllClosetitems.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.error.message || 'Failed to fetch users';
      // })
      .addCase(getClosetitemsByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getClosetitemsByUserId.fulfilled,
        (state, action: PayloadAction<Closetitem[]>) => {
          state.loading = false;
          state.closetitems = action.payload;
        }
      )
      .addCase(getClosetitemsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(addClosetitemWithImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addClosetitemWithImage.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.closetitems.push(action.payload);
        }
      )
      .addCase(addClosetitemWithImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
    // .addCase(updateClosetitem.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(
    //   updateClosetitem.fulfilled,
    //   (state, action: PayloadAction<Closetitem>) => {
    //     state.loading = false;
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
    //   state.loading = false;
    //   state.error = action.payload as string;
    // })
    // .addCase(deleteClosetitem.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(
    //   deleteClosetitem.fulfilled,
    //   (state, action: PayloadAction<string>) => {
    //     state.loading = false;
    //     const deletedClosetitemId = action.payload;
    //     state.closetitems = state.closetitems.filter(
    //       (closetitem) => closetitem._id !== deletedClosetitemId
    //     );
    //   }
    // )
    // .addCase(deleteClosetitem.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export default closetitemSlice.reducer;
