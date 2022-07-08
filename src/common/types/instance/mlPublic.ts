import {
  MLDraftAudio,
  MLDraftButton,
  MLDraftCarousel,
  MLDraftDivider,
  MLDraftImage,
  MLDraftImageText,
  MLDraftLink,
  MLDraftLogo,
  MLDraftMap,
  MLDraftPost,
  MLDraftShop,
  MLDraftSocial,
  MLDraftText,
  MLDraftVideo,
  MLDraftVote,
  MLDraftWidget,
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

  textBlocks: Array<MLDraftText & { order: number }>;
  socialBlocks: Array<MLDraftSocial & { order: number }>;
  videoBlocks: Array<MLDraftVideo & { order: number }>;
  audioBlocks: Array<MLDraftAudio & { order: number }>;
  widgetBlocks: Array<MLDraftWidget & { order: number }>;
  voteBlocks: Array<MLDraftVote & { order: number }>;
  mapBlocks: MLDraftMap[];
  postBlocks: MLDraftPost[];
  dividerBlocks: MLDraftDivider[];
  // gridBlocks: Nullable<IMLDraftGrid>[];
  // accordeonBlocks: Nullable<IMLDraftAccordeon>[];

  // images populated blocks
  linkBlocks: Array<MLDraftLink & { order: number }>;
  logoBlocks: Array<MLDraftLogo & { order: number }>;
  imageBlocks: Array<MLDraftImage & { order: number }>;
  imageTextBlocks: Array<MLDraftImageText & { order: number }>;
  carouselBlocks: Array<MLDraftCarousel & { order: number }>;
  shopBlocks: Array<MLDraftShop & { order: number }>;
  buttonBlocks: Array<MLDraftButton & { order: number }>;

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
