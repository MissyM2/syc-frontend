import { configureStore } from '@reduxjs/toolkit';
//import authReducer from '../features/user/userSlice';
import { authApi } from './services/auth/authService';
import userReducer from '../features/user/userSlice';
import closetReducer from '../features/closet/closetSlice';
//import imageUploadReducer from '../features/image/imageSlice';

const store = configureStore({
  reducer: {
    //auth: authReducer,
    closet: closetReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
