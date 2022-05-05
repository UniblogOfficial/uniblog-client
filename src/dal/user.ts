import { TCreateUserDTO, TRegisterDTO } from '../common/types/request';

import { api } from './api';

export const userAPI = {
  create({ email, password }: TCreateUserDTO) {
    return api.post(`user`, { email, password }).then(response => {
      const { accessToken, refreshToken } = response.data.auth;
      if (accessToken && refreshToken) {
        localStorage.setItem('NonameShopAccessToken', accessToken);
        localStorage.setItem('NonameShopRefreshToken', refreshToken);
      }
      return { data: response.data.data, info: response.data.info };
    });
  },

  logout() {
    return api
      .get(`auth/logout`)
      .then(response => ({ data: response.data.data, info: response.data.info }))
      .finally(() => {
        localStorage.removeItem('NonameShopAccessToken');
        localStorage.removeItem('NonameShopRefreshToken');
      });
  },

  me() {
    return api
      .get(`auth/me`)
      .then(response => ({ data: response.data.data, info: response.data.info }));
  },

  register({ name, email, password }: TRegisterDTO) {
    return api.post(`auth/register`, { name, email, password }).then(response => {
      const { accessToken, refreshToken } = response.data.auth;
      if (accessToken && refreshToken) {
        localStorage.setItem('NonameShopAccessToken', accessToken);
        localStorage.setItem('NonameShopRefreshToken', refreshToken);
      }
      return { data: response.data.data, info: response.data.info };
    });
  },
};
