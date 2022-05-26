import { Nullable, TIncomingImage } from '.';

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
  avatar: Nullable<TIncomingImage>;
  role: Role;
  isVerified: boolean;
};
