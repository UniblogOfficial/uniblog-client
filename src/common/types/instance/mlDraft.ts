import { MLContentType, SocialNetwork } from '../../constants';

import { TImageFile } from './image';

import { Nullable } from '.';

export type TMultilinkDraft = {
  name: string;
  background: string;
  contentSet: MLContentType[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
};

export type TMLDraftBlocks = {
  textSet: Nullable<IMLDraftContentText>[];
  linkSet: Nullable<IMLDraftContentLink>[];
  socialSet: Nullable<IMLDraftContentSocial>[];
  logoSet: Nullable<IMLDraftContentLogo>[];
  imageSet: Nullable<IMLDraftContentImage>[];
  imageTextSet: Nullable<IMLDraftContentImageText>[];
  videoSet: Nullable<IMLDraftContentVideo>[];
  shopSet: Nullable<IMLDraftContentShop>[];
  unknownSet: Nullable<IMLDraftContentUnknown>[];
};

export type TMLDraftImages = {
  background: Nullable<TImageFile>;
  blocks: {
    logoSet: Nullable<TMLImageContentLogo<TImageFile>>[];
    imageSet: Nullable<TMLImageContentImage<TImageFile>>[];
    imageTextSet: Nullable<TMLImageContentImageText<TImageFile>>[];
    shopSet: Nullable<TMLImageContentShop<TImageFile>>[];
  };
};

interface IMLDraftContent {
  order: number;
  isFilled: boolean;
  padding?: number | number[];
  margin?: number | number[];
  background?: string;
}

export interface IMLDraftContentText extends IMLDraftContent {
  type: MLContentType.TEXT;
  text: Nullable<string>;
  color?: string;
  fontSize?: Nullable<number>;
  fontWeight?: Nullable<number | string>;
  align?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDraftContentLink extends IMLDraftContent {
  type: MLContentType.LINK;
  href: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  color?: string;
  fontSize: Nullable<number>;
  fontWeight: Nullable<number>;
  align: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDraftContentSocial extends IMLDraftContent {
  type: MLContentType.SOCIAL;
  links: string[];
  linkTypes: SocialNetwork[];
}

export interface IMLDraftContentLogo extends IMLDraftContent {
  type: MLContentType.LOGO;
  logo: Nullable<string>;
  banner?: Nullable<string>;
  size: Nullable<number>;
}

export interface IMLDraftContentImage extends IMLDraftContent {
  type: MLContentType.IMAGE;
  images: Nullable<string>[];
  grid?: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';
}

export interface IMLDraftContentImageText extends IMLDraftContent {
  type: MLContentType.IMAGETEXT;
  image: Nullable<string>;
  imgPosition: 'right' | 'left';
  text: Nullable<string>;
  color?: string;
  fontSize: Nullable<number>;
  fontWeight: Nullable<number>;
  hAlign: 'right' | 'left' | 'center' | 'justify';
  vAlign: 'top' | 'center' | 'bottom';
}

export interface IMLDraftContentVideo extends IMLDraftContent {
  type: MLContentType.VIDEO;
  url: Nullable<string>;
}

export interface IMLDraftContentShop extends IMLDraftContent {
  type: MLContentType.SHOP;
  grid: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';
  gap?: number;
  cells: {
    order: number;
    image: Nullable<string>;
    background?: string;
    title: string;
    subtitle?: string;
    href?: string;
    color?: string;
    fontSize?: Nullable<number>;
    fontWeight?: Nullable<number>;
    align?: 'right' | 'left' | 'center';
    subtitleColor?: string;
    subtitleFontSize?: number;
    subtitleFontWeight?: number;
    subtitleAlign?: 'right' | 'left' | 'center';
  }[];
}

export interface IMLDraftContentUnknown extends IMLDraftContent {
  type: MLContentType.UNKNOWN;
}

// image blocks types

export type TMLImageContentLogo<TImage> = {
  order: number;
  logo: Nullable<TImage>;
  banner?: Nullable<TImage>;
};

export type TMLImageContentImage<TImage> = {
  order: number;
  images: Nullable<TImage>[];
};

export type TMLImageContentImageText<TImage> = {
  order: number;
  image: Nullable<TImage>;
};

export type TMLImageContentShop<TImage> = {
  order: number;
  cells: Nullable<TImage>[];
};
