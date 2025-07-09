import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Store } from 'redux';
import type { RootState } from './store';
//import { logoutUser } from '../features/auth/authSlice';

const setupAxiosInterceptors = (store: Store<RootState>): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      // to test upload without token
      //console.log('state is ' + JSON.stringify(state));

      // state.auth.userToken = '';
      // state.auth.isAuthenticated = false;

      const token = state.auth.userToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('inside axiosInstance: what is token? ' + token);
      console.log(
        'inside axiosInstance: what is config? ' + JSON.stringify(config)
      );
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle token expiry and refresh (optional)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement token refresh logic here, e.g., dispatch a refresh token action
        // await store.dispatch(refreshTokenAction());
        // const newToken = store.getState().auth.token; // Get new token from state
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default setupAxiosInterceptors;
