import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './app/store.ts';
import './index.css';
import setupAxiosInterceptors from './utils/axiosInstance.ts';

//  Initialize the Axios instance with dispatch
const axiosInstance = setupAxiosInterceptors(store);

// You can now export or make this axiosInstance globally available if needed
export const api = axiosInstance;

createRoot(document.getElementById('root')! as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
