import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import closetitemReducer from '../features/closetitems/closetitemSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    closetitemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
