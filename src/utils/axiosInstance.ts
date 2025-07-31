import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type { Store } from 'redux';
import type { RootState } from '../app/store';
//import { logoutUser } from '../features/user/userSlice';

const setupAxiosInterceptors = (store: Store<RootState>): AxiosInstance => {
  const instance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your backend URL
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 5000,
  });

  instance.interceptors.request.use(
    (config) => {
      const state = store.getState();
      // to test upload without userToken
      //console.log('state is ' + JSON.stringify(state));
      // state.user.userToken = '';
      // state.user.isAuthenticated = false;

      const userToken = state.user.userToken;

      if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`;
      }
      // console.log('inside axiosInstance: what is userToken? ' + userToken);
      // console.log(
      //   'inside axiosInstance: what is config? ' + JSON.stringify(config)
      // );
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response Interceptor: Handle userToken expiry and refresh (optional)
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        // Implement userToken refresh logic here, e.g., dispatch a refresh userToken action
        // await store.dispatch(refreshTokenAction());
        // const newToken = store.getState().auth.userToken; // Get new userToken from state
        // originalRequest.headers.Authorization = `Bearer ${newToken}`;
        // return instance(originalRequest);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default setupAxiosInterceptors;
