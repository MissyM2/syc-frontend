import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  //getAllClosetitems,
  getClosetitemsByUserId,
  addClosetitemWithImage,
  //updateClosetitem,
  //deleteClosetitem,
} from './closetitemActions';

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

export interface ClosetitemsState {
  closetitems: Closetitem[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Define the initial state using that type
const initialState: ClosetitemsState = {
  closetitems: [],
  loading: false,
  error: null,
  success: false,
};

export type TClosetitemList = Closetitem[];

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
      // .addCase(getClosetitemsByUserId.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
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
      .addCase(
        addClosetitemWithImage.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.closetitems.push(action.payload);
        }
      );
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
