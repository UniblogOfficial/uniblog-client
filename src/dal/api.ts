import axios from 'axios';

import { TUserData } from '../bll/reducers';
import { StatusCode } from '../common/constants';

export const authAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'API-KEY': process.env.REACT_APP_API_KEY,
    Authorization: 'Bearer ',
  },
});

authAPI.interceptors.request.use(config => {
  const token = localStorage.getItem('UniblogAccessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

authAPI.interceptors.response.use(
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
        const response = await axios.get<TAuthResponse<TUserData>>(
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
        return authAPI.request(originalRequest);
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
  info: Array<string>;
};
export type TAuthResponse<TData = {}> = {
  data: TData;
  auth: { accessToken: string; refreshToken: string };
  info: Array<string>;
};
