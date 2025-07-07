// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:3000', // Replace with your API URL
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default axiosInstance;

// api/axiosInstance.ts
import axios from 'axios';
import store from './store';
import { logout } from '../features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('inside axiosInstance: what is token? ' + token);
    console.log('inside axiosInstance: what is config? ' + config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., clear token and redirect to login
      store.dispatch(logout());
      // Optionally, redirect to login page here using react-router-dom or similar
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
