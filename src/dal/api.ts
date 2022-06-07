import axios from 'axios';

import { StatusCode } from 'common/constants';
import { TUser } from 'common/types/instance';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
    Authorization: 'Bearer ',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('UniblogAccessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response.status === StatusCode.UNAUTHORIZED &&
      error.config &&
      !error.config.isRetry
    ) {
      originalRequest.isRetry = true;
      try {
        const token = localStorage.getItem('UniblogRefreshToken');
        localStorage.removeItem('UniblogAccessToken');
        localStorage.removeItem('UniblogRefreshToken');
        if (!token) return new Error('Token not found');
        const response = await axios.get<TAuthResponse<TUser>>(
          `${process.env.REACT_APP_API_URL}auth/refresh`,
          {
            withCredentials: true,
            headers: {
              'API-KEY': process.env.REACT_APP_API_KEY,
              Authorization: token ? `Bearer ${token}` : '',
            },
          },
        );
        const { accessToken, refreshToken } = response.data.auth;
        if (accessToken && refreshToken) {
          localStorage.setItem('UniblogAccessToken', accessToken);
          localStorage.setItem('UniblogRefreshToken', refreshToken);
        }
        return api.request(originalRequest);
      } catch (e) {
        console.log('Error while refreshing');
      }
    }
    throw error;
  },
);

export const mockAPI = axios.create({
  baseURL: 'http://localhost:4200/',
});

export type TResponse<TData = {}> = {
  data: TData;
  message: Array<string>;
};
export type TAuthResponse<TData = {}> = {
  data: TData;
  auth: { accessToken: string; refreshToken: string };
  message: Array<string>;
};
