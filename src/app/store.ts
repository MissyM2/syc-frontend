import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from './services/auth/authService';
import userReducer from '../features/user/userSlice';
import closetitemReducer from '../features/closetitem/closetitemSlice';
//import imageUploadReducer from '../features/image/imageSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    closetitem: closetitemReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
