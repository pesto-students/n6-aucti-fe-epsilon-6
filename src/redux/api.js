import axios from 'axios';
import { baseURL } from './apis';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  validateStatus: () => true,
});

api.interceptors.response.use(
  response => response,
  error => error,
);

export const initializeInterceptor = token => {
  api.interceptors.request.use(config => {
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  });
};

export default api;
