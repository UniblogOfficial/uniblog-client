import { MLContentType, SocialNetwork } from '../../constants';

import { TImageFile, TIncomingImage } from './image';

import { Nullable } from '.';

export type TMultilinkDraft = {
  name: string;
  background: undefined | string | TImageFile;
  contentSet: MLContentType[];
  blocks: TMLDraftBlocks;
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
  icons: SocialNetwork[];
}

export interface IMLDraftContentLogo extends IMLDraftContent {
  type: MLContentType.LOGO;
  image: Nullable<TImageFile & TIncomingImage>;
  banner?: Nullable<TImageFile & { src: string }>;
  size: Nullable<number>;
}

export interface IMLDraftContentImage extends IMLDraftContent {
  type: MLContentType.IMAGE;
  images: Nullable<TImageFile & { src: string }>[];
  grid?: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';
}

export interface IMLDraftContentImageText extends IMLDraftContent {
  type: MLContentType.IMAGETEXT;
  image: Nullable<TImageFile & { src: string }>;
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
    image: Nullable<TImageFile & { src: string }>;
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
