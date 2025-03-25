import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  
  // api.interceptors.response.use(
  //   response => response.data,
  //   error => {
  //     const message = error.response?.data?.message || error.message;
  //     return Promise.reject(message);
  //   }
  // );

  export default api;