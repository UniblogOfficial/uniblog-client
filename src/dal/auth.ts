import { TUser } from '../common/types/instance';

import { api } from '.';

import { TLoginDto, TRegisterDto } from 'common/types/request';

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
      console.log(response.data.data);
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

type ResponseLoginDataAvatarType = {
  createdAt: string;
  id: number;
  imageType: string;
  updatedAt: string;
  userId: number;
  imageData: {
    type: string;
    data: Array<number>;
  };
};
type ResponseLoginDataRolesType = {
  id: number;
  value: string;
  updatedAt: string;
  description: string;
  createdAt: string;
  UserRole: {
    id: number;
    roleId: number;
    userId: number;
  };
};
export type ResponseLoginDataType = {
  updatedAt: string;
  // Приходит пустой массив там, где any
  socials: any;
  posts: any;
  roles: Array<ResponseLoginDataRolesType>;
  password: string;
  name: string;
  isVerified: boolean;
  id: number;
  email: string;
  createdAt: string;
  banned: boolean;
  banReason: null;
  avatar: ResponseLoginDataAvatarType;
};
export type ResponseLoginType = {
  auth: any;
  data: ResponseLoginDataType;
};
export type ResponseAuthMeType = {
  data: TUser;
};
