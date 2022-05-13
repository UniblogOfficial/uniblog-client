import { Nullable } from '.';

export enum Role {
  UNREGISTERED = 'UNREGISTERED',
  USER = 'USER',
  ADMIN = 'ADMIN',
  MASTER = 'MASTER',
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar: Nullable<TAvatar>;
  role: Role;
  isVerified: boolean;
};

export type TAvatar = {
  imageType: string;
  imageData: string;
};
