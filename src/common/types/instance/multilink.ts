import { TImageFile } from '../../../ui/pages/main/multilink/editor/content/MLContent';
import { MLContentType, SocialNetwork } from '../../constants';

import { Nullable } from '.';

export type TMultilink = {
  id: number;
  userId: number;
  name: string;
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
  template: Nullable<number[]>;
  background: undefined | string;
  contentSet: Nullable<TMLDraftContent>[];
};

export type TMLDraftContent = {
  order: number;
  type: MLContentType;
  link: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  text: Nullable<string>;
  img: TImageFile | undefined;
};

export type TMultilinkComplete = {
  name: string;
  template: number[];
  background: string;
  contentSet: TMLDraftContent[];
};
