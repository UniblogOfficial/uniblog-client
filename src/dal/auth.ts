import { TLoginDto, TRegisterDto } from '../common/types/request';

import { api } from './api';

export const authAPI = {
  login({ email, password }: TLoginDto) {
    return api.post(`auth/login`, { email, password }).then(response => {
      // const { accessToken, refreshToken } = response.data.auth;
      const { token } = response.data.auth;
      if (token) {
        localStorage.setItem('UniblogAccessToken', token);
      }
      /* if (accessToken && refreshToken) {
        localStorage.setItem('UniblogAccessToken', accessToken);
        localStorage.setItem('UniblogRefreshToken', refreshToken);
      } */
      return { data: response.data.data, info: response.data.info };
    });
  },

  logout() {
    localStorage.removeItem('UniblogAccessToken');
    localStorage.removeItem('UniblogRefreshToken');
  },

  me() {
    return api
      .get(`auth/me`)
      .then(response => ({ data: response.data.data, info: response.data.info }));
  },

  register({ name, email, password }: TRegisterDto) {
    return api.post(`auth/register`, { name, email, password }).then(response => {
      const { token } = response.data.auth;
      if (token) {
        localStorage.setItem('UniblogAccessToken', token);
      }
      /* const { accessToken, refreshToken } = response.data.auth;
      if (accessToken && refreshToken) {
        localStorage.setItem('UniblogAccessToken', accessToken);
        localStorage.setItem('UniblogRefreshToken', refreshToken);
      } */
      return { data: response.data.data, info: response.data.info };
    });
  },
};
