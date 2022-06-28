import { Nullable } from '..';
import { TImageFile } from '../image';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';
import { IMLDraftAudio, MLDraftAudio } from './mlAudio.class';
import { IMLDraftButton, MLDraftButton } from './mlButton.class';
import { IMLDraftCarousel, MLDraftCarousel } from './mlCarousel.class';
import { IMLDraftDivider, MLDraftDivider } from './mlDivider.class';
import {
  TMLImageContentLogo,
  TMLImageContentLink,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentShop,
  TMLImageContentButton,
  TMLImageContentCarousel,
} from './mlDraft';
import { IMLDraftImage, MLDraftImage } from './mlImage.class';
import { IMLDraftImageText, MLDraftImageText } from './mlImageText.class';
import { IMLDraftLink, MLDraftLink } from './mlLink.class';
import { IMLDraftLogo, MLDraftLogo } from './mlLogo.class';
import { IMLDraftMap, MLDraftMap } from './mlMap.class';
import { IMLDraftPost, MLDraftPost } from './mlPost.class';
import { IMLDraftShop, MLDraftShop } from './mlShop.class';
import { IMLDraftSocial, MLDraftSocial } from './mlSocial.class';
import { IMLDraftText, MLDraftText } from './mlText.class';
import { IMLDraftVideo, MLDraftVideo } from './mlVideo.class';
import { IMLDraftVote, MLDraftVote } from './mlVote.class';
import { IMLDraftWidget, MLDraftWidget } from './mlWidget.class';

export type TMultilinkDraft = {
  name: string;
  background: string;
  maxWidth: number;
  contentMap: string[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
  imageLink?: Nullable<string>;
};

export type TMLDraftBlocks = { [key: string]: TMLDraftBlocksUnion };

export type TMLDraftBlocksUnion =
  | MLDraftText
  | MLDraftSocial
  | MLDraftWidget
  | MLDraftVideo
  | MLDraftAudio
  | MLDraftMap
  | MLDraftPost
  | MLDraftVote
  | MLDraftDivider
  //
  | MLDraftLink
  | MLDraftButton
  | MLDraftImage
  | MLDraftImageText
  | MLDraftCarousel
  | MLDraftLogo
  | MLDraftShop;

export type TMLDraftImages = {
  background: Nullable<TImageFile>;
  blocks: {
    logoBlocks: Nullable<TMLImageContentLogo<TImageFile>>[];
    linkBlocks: Nullable<TMLImageContentLink<TImageFile>>[];
    imageBlocks: Nullable<TMLImageContentImage<TImageFile>>[];
    imageTextBlocks: Nullable<TMLImageContentImageText<TImageFile>>[];
    shopBlocks: Nullable<TMLImageContentShop<TImageFile>>[];
    buttonBlocks: Nullable<TMLImageContentButton<TImageFile>>[];
    carouselBlocks: Nullable<TMLImageContentCarousel<TImageFile>>[];
  };
};

export type {
  IMLDraftText,
  IMLDraftLink,
  IMLDraftLogo,
  IMLDraftSocial,
  IMLDraftImage,
  IMLDraftImageText,
  IMLDraftVideo,
  IMLDraftShop,
  IMLDraftAudio,
  IMLDraftButton,
  IMLDraftCarousel,
  IMLDraftDivider,
  IMLDraftMap,
  IMLDraftPost,
  IMLDraftVote,
  IMLDraftWidget,
  TMLImageContentLogo,
  TMLImageContentLink,
  TMLImageContentImage,
  TMLImageContentImageText,
  TMLImageContentShop,
  TMLImageContentButton,
  TMLImageContentCarousel,
};
export {
  MLDraftAudio,
  MLDraftBlock,
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
};