import { TCreateUserDto, TRegisterDto } from '../common/types/request';

import { api } from './api';

export const userAPI = {
  create({ email, password }: TCreateUserDto) {
    return api.post(`user`, { email, password }).then(response => {
      const { accessToken, refreshToken } = response.data.auth;
      if (accessToken && refreshToken) {
        localStorage.setItem('NonameShopAccessToken', accessToken);
        localStorage.setItem('NonameShopRefreshToken', refreshToken);
      }
      return { data: response.data.data, message: response.data.message };
    });
  },

  updateAvatar(image: File) {
    const formData = new FormData();
    formData.append('avatar', image);
    return api
      .post(`user/avatar`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => ({ data: response.data.data, message: response.data.message }));
  },
};
