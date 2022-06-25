import {
  IMLDraftAudio,
  IMLDraftButton,
  IMLDraftCarousel,
  IMLDraftDivider,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftMap,
  IMLDraftPost,
  IMLDraftShop,
  IMLDraftSocial,
  IMLDraftText,
  IMLDraftVideo,
  IMLDraftVote,
  IMLDraftWidget,
  Nullable,
  TIncomingImage,
} from '.';

import { MLContentType, SocialNetwork } from 'common/constants';

export type TMultilink = {
  // id: number;
  // userId: number;
  name: string;
  background: string;
  // clickCount: number;
  contentMap: MLContentType[];

  textBlocks: IMLDraftText[];
  socialBlocks: IMLDraftSocial[];
  videoBlocks: IMLDraftVideo[];
  audioBlocks: IMLDraftAudio[];
  widgetBlocks: IMLDraftWidget[];
  voteBlocks: IMLDraftVote[];
  mapBlocks: IMLDraftMap[];
  postBlocks: IMLDraftPost[];
  dividerBlocks: IMLDraftDivider[];
  // gridBlocks: Nullable<IMLDraftGrid>[];
  // accordeonBlocks: Nullable<IMLDraftAccordeon>[];

  // images populated blocks
  linkBlocks: IMLDraftLink[];
  logoBlocks: IMLDraftLogo[];
  imageBlocks: IMLDraftImage[];
  imageTextBlocks: IMLDraftImageText[];
  carouselBlocks: IMLDraftCarousel[];
  shopBlocks: IMLDraftShop[];
  buttonBlocks: IMLDraftButton[];

  images: Array<{ id: number; order: number; suborder: number } & TIncomingImage>;
  // createdAt: string;
  // updatedAt: string;
  // deletedAt: Nullable<string>;
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
