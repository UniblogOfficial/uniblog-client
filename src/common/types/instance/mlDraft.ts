import { MLContentType, SocialNetwork } from '../../constants';

import { TImageFile, TIncomingImage } from './image';

import { Nullable } from '.';

export type TMultilinkDraft = {
  name: string;
  background: undefined | string;
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
  unknownSet: Nullable<IMLDraftContentUnknown>[];
};

interface IMLDraftContent {
  order: number;
  isFilled: boolean;
  padding?: number | number[];
  margin?: number | number[];
}

export interface IMLDraftContentText extends IMLDraftContent {
  type: MLContentType.TEXT;
  text: Nullable<string>;
  fontSize?: Nullable<number>;
  fontWeight?: Nullable<number>;
  align?: 'right' | 'left' | 'center' | 'justify';
  background?: string;
}

export interface IMLDraftContentLink extends IMLDraftContent {
  type: MLContentType.LINK;
  href: Nullable<string>;
  linkType: Nullable<SocialNetwork | 'third-party'>;
  title: Nullable<string>;
  fontSize: Nullable<number>;
  fontWeight: Nullable<number>;
  align: 'right' | 'left' | 'center' | 'justify';
  background?: string;
}

export interface IMLDraftContentSocial extends IMLDraftContent {
  type: MLContentType.SOCIAL;
  links: string[];
  icons: SocialNetwork[];
  background?: string;
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
}

export interface IMLDraftContentImageText extends IMLDraftContent {
  type: MLContentType.IMAGETEXT;
  image: Nullable<TImageFile & { src: string }>;
  imgPosition: 'top' | 'right' | 'bottom' | 'left';
  text: Nullable<string>;
  fontSize: Nullable<number>;
  fontWeight: Nullable<number>;
  hAlign: 'right' | 'left' | 'center' | 'justify';
  vAlign: 'top' | 'center' | 'bottom';
  background?: string;
}

export interface IMLDraftContentUnknown extends IMLDraftContent {
  type: MLContentType.UNKNOWN;
}
