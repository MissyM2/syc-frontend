// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import type { User } from '../../types/auth.ts';

// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (
//     credentials: { username: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post('/api/auth/login', credentials);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );

// export const logoutUser = createAsyncThunk('auth/logout', async () => {
//   return;
// });

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async (
//     credentials: { username: string; email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post('/api/auth/register', credentials);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );

// export const fetchUser = createAsyncThunk(
//   'auth/fetchUser',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('/api/auth/user');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'An error occurred');
//     }
//   }
// );
