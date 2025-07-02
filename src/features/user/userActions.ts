import type { AppDispatch, RootState } from '@/app/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

export interface User {
  _id: string;
  userName: string;
  email: string;
  password?: string;
}

//  #1 Get all users
export const getAllUsers = createAsyncThunk<
  User[],
  void,
  { rejectValue: AxiosError }
>('users/getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<User[]> = await axiosInstance.get<User[]>(
      `${URL}/api/users`
    );
    return response.data;
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});

export const updateUser = createAsyncThunk<
  User,
  User,
  { state: RootState; dispatch: AppDispatch }
>('users/updateClosetitem', async (user: User, { rejectWithValue }) => {
  try {
    // Simulate an API call to update the user
    const response = await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});

export const deleteUser = createAsyncThunk<
  string,
  string,
  { state: RootState; dispatch: AppDispatch }
>('users/deleteUser', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete user');
    }

    // Return the deleted user ID
    return userId;
  } catch (error) {
    if (axiosInstance.isAxiosError(error)) {
      return rejectWithValue(error); // Reject with the AxiosError
    }
    throw error; // Re-throw other errors
  }
});
