import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
import type { Closetitem } from '@/interfaces/Interfaces.tsx';
import axios from 'axios';

export interface ClosetItemState {
  closetitem: Closetitem | null;
  loading: boolean;
  error: string | null;
}

// Define the initial state using that type
const initialState: ClosetItemState = {
  closetitem: null,
  loading: false,
  error: null,
};

const URL = 'http://localhost:3000';

// async thunk for making the POST request
export const addClosetitem = createAsyncThunk(
  'closetitem/addClosetitem',
  async (newClosetitemData: Omit<Closetitem, '_id'>, { rejectWithValue }) => {
    if (!newClosetitemData.imageFile) {
      throw new Error('No file provided');
    }
    console.log('addClosetitem, newClosetitemData: ' + newClosetitemData);

    // const imageId = newClosetitemData.imageFile.name;
    // newClosetitemData.imageId = imageId;

    // const data = await createImage(newClosetitemData.imageFile);
    // if (data != null) {
    //   console.log('check if image was created.');
    // }

    // try {
    //   console.log(
    //     'addClosetitem:try, newClosetitemData: ' +
    //       JSON.stringify(newClosetitemData)
    //   );
    //   const response = await axios.post(
    //     `${URL}/syc/closetitems`,
    //     newClosetitemData
    //   );
    //   return response.data as Closetitem;
    // } catch (error: any) {
    //   return rejectWithValue(error.response?.data || 'An error occurred');
    // }
  }
);

// does this need to be a redux action?
export async function createImage(file: string | Blob) {
  const formData = new FormData();
  formData.append('imageFile', file);

  try {
    const response = await axios.post(`${URL}/images`, formData, {
      headers: {},
    });
  } catch (error) {
    console.error('Error:', error);
  }

const closetitemSlice = createSlice({
  name: 'closetitem',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addClosetitem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addClosetitem.fulfilled,
        (state, action: PayloadAction<Closetitem>) => {
          state.loading = false;
          state.closetitem = action.payload;
        }
      )
      .addCase(addClosetitem.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//export const closetitemSelector = (state: RootState) => state.closetitemReducer;
export default closetitemSlice.reducer;
