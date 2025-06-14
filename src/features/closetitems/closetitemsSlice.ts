import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import axios, { type AxiosResponse, AxiosError, isAxiosError } from 'axios';

export interface ClosetItemsState {
  closetitems: Closetitem[];
  loading: boolean;
  error: string | null;
}

const initialState: ClosetItemsState = {
  closetitems: [],
  loading: false,
  error: null,
};

export type TClosetitemList = Closetitem[];

const URL = 'http://localhost:3000';

export const fetchClosetitems = createAsyncThunk(
  'closetitems/fetchClosetitems',
  async () => {
    const response: AxiosResponse = await axios.get<TClosetitemList>(
      `${URL}/syc/closetitems`
    );
    console.log(response);
    return response.data as Closetitem[];
  }
);

const closetitemsSlice = createSlice({
  name: 'closetitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClosetitems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchClosetitems.fulfilled,
        (state, action: PayloadAction<Closetitem[]>) => {
          state.loading = false;
          state.closetitems = action.payload;
        }
      )
      .addCase(fetchClosetitems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

//export const closetitemSelector = (state: RootState) => state.closetitemReducer;
export default closetitemsSlice.reducer;
