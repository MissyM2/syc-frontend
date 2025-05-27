import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store.ts';
import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import axios from 'axios';

export interface ClosetItemsState {
  closetitems: Closetitem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Define the initial state using that type
const initialState: ClosetItemsState = {
  closetitems: [],
  status: 'idle',
  error: null,
};

const CLOSETITEMS_URL =
  'mongodb+srv://fdmaloney:Daisl9515$!#@@fdmclustersandbox.0zdlunl.mongodb.net/syc-backend?retryWrites=true&w=majority&appName=FDMClusterSandbox/closetitems';
export const fetchClosetitems = createAsyncThunk(
  'closetitems/fetchClosetitems',
  async () => {
    const response = await axios.get(CLOSETITEMS_URL);
    return response.data as Closetitem[];
  }
);

// async thunk for making the POST request
export const postNewClosetitem = createAsyncThunk(
  'closetitems/postClosetitem',
  async (newClosetitem: Omit<Closetitem, 'id'>) => {
    const response = await axios.post(CLOSETITEMS_URL, newClosetitem);
    return response.data as Closetitem;
  }
);

const closetitemSlice = createSlice({
  name: 'closetitems',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClosetitems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        fetchClosetitems.fulfilled,
        (state, action: PayloadAction<Closetitem[]>) => {
          state.status = 'succeeded';
          state.closetitems = action.payload;
        }
      )
      .addCase(fetchClosetitems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch closetitems.';
      })
      .addCase(postNewClosetitem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        postNewClosetitem.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.status = 'succeeded';
          state.closetitems.push(action.payload);
        }
      )
      .addCase(postNewClosetitem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create closetitem.';
      });
  },
});

export const closetitemSelector = (state: RootState) => state.closetitemReducer;
export default closetitemSlice.reducer;
