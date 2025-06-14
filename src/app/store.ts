import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/users/authSlice';
//import usersReducer from '../features/users/usersSlice';
//import closetitemReducer from '../features/closetitems/closetitemSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //closetitemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
