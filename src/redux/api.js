import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:9000/.netlify/functions/api",
  baseURL: 'https://aucti-be.netlify.app/.netlify/functions/api',
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
