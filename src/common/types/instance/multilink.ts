import { MLContentType, SocialNetwork } from '../../constants';

import { TAvatar } from './user';

import { Nullable, TImageFile } from '.';

export type TMultilink = {
  id: number;
  userId: number;
  name: string;
  logo: Nullable<TAvatar>;
  template: number[];
  background: string;
  content: TMLContent[];
  // temporary data about owner
  /*   user: {
          "id": 4,
          "name": "VasyaRaper",
          "email": "test@test.test",
          "isVerified": false,
          "banned": false,
          "banReason": null,
          "vk_id": null,
          "youtube_id": null,
          "createdAt": "2022-05-03T21:57:23.871Z",
          "updatedAt": "2022-05-03T21:57:23.871Z"
      } */
};

export type TMLContent = {
  order: number;
  type: MLContentType;
  link: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  text: Nullable<string>;
  imageName: string | undefined;
  imageType: string | undefined;
  imageData: string | undefined;
};

export type TMultilinkDraft = {
  name: string;
  avatar: Nullable<TAvatar>;
  logo: Nullable<TImageFile>;
  template: Nullable<number[]>;
  background: undefined | string;
  contentSet: TMLDraftContent[];
};

export type TMLDraftContent = {
  order: number;
  type: MLContentType;
  isFilled: boolean;
  link: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  text: Nullable<string>;
  img: Nullable<TImageFile>;
};

export type TMultilinkComplete = {
  name: string;
  logo: Nullable<TImageFile>;
  template: number[];
  background: string;
  contentSet: TMLDraftContent[];
};
