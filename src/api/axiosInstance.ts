import axios from 'axios';

// this is the apiClient: changed to name to be more descriptive

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

//console.log('axiosInstance: what is baseURL: ' + baseURL));

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
