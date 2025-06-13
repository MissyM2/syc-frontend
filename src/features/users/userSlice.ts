import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
import type { User } from '../../interfaces/Interfaces.tsx';
import axios from 'axios';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const URL = 'http://localhost:3000';
// const USERS_URL =
//   'mongodb+srv://fdmaloney:Daisl9515$!#@@fdmclustersandbox.0zdlunl.mongodb.net/syc-backend?retryWrites=true&w=majority&appName=FDMClusterSandbox/users';

// async thunk for making the POST request
export const addUser = createAsyncThunk(
  'user/addUser',
  async (newUserData: Omit<User, '_id'>, { rejectWithValue }) => {
    try {
      console.log('addUser:try, newUserData: ' + JSON.stringify(newUserData));
      const response = await axios.post(`${URL}/syc/users`, newUserData);
      console.log('what is response after post? ' + response);
      return response.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

//export const userSelector = (state: RootState) => state.userReducer;
export default userSlice.reducer;
