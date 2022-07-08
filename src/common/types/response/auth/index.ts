import { TUser } from '../../instance';

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
  data: ResponseLoginDataType;
};
export type ResponseAuthMeType = {
  data: TUser;
};
