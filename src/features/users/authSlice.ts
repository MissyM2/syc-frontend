import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
//import type { RootState } from '../../app/store.ts';
//import type { User, LoginUser } from '../../interfaces/Interfaces.tsx';
//import axios, { type AxiosResponse, AxiosError, isAxiosError } from 'axios';
import axiosInstance from '../../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';

// export interface UserState {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
// }
export interface User {
  _id: string;
  name: string;
  emailAddress: string;
  password?: string;
  token?: string;
  dateCreated: Date;
}

// export interface LoginRequest {
//   username: string;
//   password: string;
// }

// export interface LoginResponse {
//   user: User;
//   token: string;
//   message: string;
// }

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const token = localStorage.getItem('token');
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

//const URL = 'http://localhost:3000';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: any, { rejectWithValue }) => {
    try {
      console.log('registerUser, userData: ' + userData);
      const response = await axiosInstance.post('api/register', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || 'Registration failed'
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: { name: string; password: string },
    { rejectWithValue }
  ) => {
    console.log('inside loginuser');
    try {
      console.log('inside try ');
      console.log('what are credentials? ' + JSON.stringify(credentials));
      const response = await axiosInstance.post('api/login', credentials);
      console.log('what is response? ' + JSON.stringify(response));
      console.log('what is token? ' + response.data.token);
      console.log('what is user? ' + response.data.user);
      console.log('what is name? ' + response.data.name);

      sessionStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  // async (token: string, { rejectWithValue }) => {
  async (credentials, { rejectWithValue }) => {
    try {
      // const response = await axiosInstance.get('/verifyToken', {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // });
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ token: any; user: any }>) => {
          state.loading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          //state.token = action.payload.token;
          sessionStorage.setItem('user', JSON.stringify(action.payload.user));
          sessionStorage.setItem('token', action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

// async thunk for making the POST request
// export const addUser = createAsyncThunk(
//   'user/addUser',
//   async (newUserData: Omit<User, '_id'>, { rejectWithValue }) => {
//     try {
//       console.log('addUser:try, newUserData: ' + JSON.stringify(newUserData));
//       const response = await axios.post(`${URL}/syc/users`, newUserData);
//       console.log('what is response after post? ' + response);
//       return response.data as User;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );

// export const loginUser = (credentials: any) => {
//   return async (dispatch: Dispatch<AuthActionTypes>) => {
//     try {
//       const response = await axios.post('/login', credentials);
//       localStorage.setItem('token', response.data.token);
//       dispatch({ type: LOGIN_SUCCESS, payload: response.data.token });
//       dispatch(getUserData());
//     } catch (error: any) {
//       console.error('Login error:', error);
//     }
//   };
// };

// export const verifyToken = () => {
//   return async (dispatch: Dispatch<AuthActionTypes>) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//       try {
//         const response = await axios.get('/verifyToken');
//         dispatch({ type: SET_USER, payload: response.data.user });
//       } catch (error: any) {
//         console.error('Token verification error:', error);
//         localStorage.removeItem('token');
//       }
//     }
//   };
// };

// export const getUserData = () => {
//   return async (dispatch: Dispatch<AuthActionTypes>) => {
//     try {
//       const response = await axios.get('/user');
//       dispatch({ type: SET_USER, payload: response.data });
//     } catch (error: any) {
//       console.error('Get user data error:', error);
//     }
//   };
// };

// export const logoutUser = () => {
//   localStorage.removeItem('token');
//   return { type: LOGOUT };
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(addUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(addUser.rejected, (state, action: PayloadAction<any>) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

//export const userSelector = (state: RootState) => state.userReducer;
//export default userSlice.reducer;
