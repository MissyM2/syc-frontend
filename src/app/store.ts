import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from './services/auth/authService';
import userReducer from '../features/user/userSlice';
import closetitemReducer from '../features/closetitem/closetitemSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    closetitems: closetitemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
