// eslint-disable-next-line import/no-unresolved
import { Property } from 'csstype';

import { TImageFile, Nullable } from '.';

import { MLContentType, SocialNetwork, SocialService } from 'common/constants';
// eslint-disable-next-line import/order
import { TIconName } from 'ui/components/modules/iconSpritesMaps/IconSpritesMap';

// eslint-disable-next-line import/order
import TextShadow = Property.TextShadow;

export type TMultilinkDraft = {
  name: string;
  background: string;
  // maxWidth
  contentMap: MLContentType[];
  blocks: TMLDraftBlocks;
  images: TMLDraftImages;
};

export type TMLDraftBlocks = {
  textBlocks: Nullable<IMLDraftText>[];
  socialBlocks: Nullable<IMLDraftSocial>[];
  videoBlocks: Nullable<IMLDraftVideo>[];
  audioBlocks: Nullable<IMLDraftAudio>[];
  widgetBlocks: Nullable<IMLDraftWidget>[];
  voteBlocks: Nullable<IMLDraftVote>[];
  mapBlocks: Nullable<IMLDraftMap>[];
  postBlocks: Nullable<IMLDraftPost>[];
  dividerBlocks: Nullable<IMLDraftDivider>[];
  // gridBlocks: Nullable<IMLDraftGrid>[];
  // accordeonBlocks: Nullable<IMLDraftAccordeon>[];

  // images populated blocks
  linkBlocks: Nullable<IMLDraftLink>[];
  logoBlocks: Nullable<IMLDraftLogo>[];
  imageBlocks: Nullable<IMLDraftImage>[];
  imageTextBlocks: Nullable<IMLDraftImageText>[];
  carouselBlocks: Nullable<IMLDraftCarousel>[];
  shopBlocks: Nullable<IMLDraftShop>[];
  buttonBlocks: Nullable<IMLDraftButton>[];
};

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

interface IMLDraftContent {
  order: number;
  isFilled: boolean;
  padding?: number[];
  margin?: number[];
  background?: string;
  borderRadius?: number;
}

interface IMLTextProperties {
  color?: string;
  // font must contain size & family;
  // all props: font-style font-variant font-weight font-size/line-height font-family
  // exm. #1: italic small-caps bold 12px/30px Georgia, serif;
  // exm. #2: 20px Arial, sans-serif; <= required
  font?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  letterSpacing?: number;
  textShadow?: [number, number, number, string][]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
  // textShadow?: string; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
  align?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDraftText extends IMLDraftContent, IMLTextProperties {
  type: MLContentType.TEXT;
  text: Nullable<string>;
  href?: string;
  icon?: TIconName;
  iconPosition?: 'sticky' | 'aside';
  iconSide?: 'right' | 'left';
}

export interface IMLDraftLink extends IMLDraftContent, IMLTextProperties {
  type: MLContentType.LINK;
  href: Nullable<string>;
  linkType: Nullable<(SocialNetwork | SocialService) | 'third-party'>;
  title: Nullable<string>;
}

export interface IMLDraftSocial extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.SOCIAL;
  links: string[];
  linkTypes: (SocialNetwork | SocialService)[];
  size?: number;
}

export interface IMLDraftButton extends IMLDraftContent, IMLTextProperties {
  type: MLContentType.BUTTON;
  href: Nullable<string>;
  title: Nullable<string>;
}

export interface IMLDraftLogo extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.LOGO;
  logo: Nullable<string>;
  banner?: Nullable<string>;
  size: Nullable<number>;
  hAlign: 'right' | 'left' | 'center';
  vAlign: 'center' | 'bottom';
}

export interface IMLDraftImage extends IMLDraftContent, IMLTextProperties {
  type: MLContentType.IMAGE;
  images: Nullable<string>[];
  grid?: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';
  titles?: string[];
  imgPosition: 'top' | 'bottom';
  textPosition: 'inside' | 'outside';
}

export interface IMLDraftCarousel extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.CAROUSEL;
  images: Nullable<string>[];
  dots: boolean;
  arrows: boolean;
  interval: number;
}

export interface IMLDraftImageText extends IMLDraftContent, Omit<IMLTextProperties, 'align'> {
  type: MLContentType.IMAGETEXT;
  image: Nullable<string>;
  imgPosition: 'right' | 'left';
  text: Nullable<string>;
  hAlign: 'right' | 'left' | 'center' | 'justify';
  vAlign: 'top' | 'center' | 'bottom';
}

export interface IMLDraftVideo extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.VIDEO;
  url: Nullable<string>;
}

export interface IMLDraftAudio extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.AUDIO;
  url: Nullable<string>;
}

export interface IMLDraftWidget extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.WIDGET;
  url: Nullable<string>;
}

export interface IMLDraftMap extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.MAP;
  url: Nullable<string>;
}

export interface IMLDraftPost extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.POST;
  url: Nullable<string>;
}

export interface IMLDraftVote extends Omit<IMLDraftContent, 'borderRadius'>, IMLTextProperties {
  type: MLContentType.VOTE;
  cells: {
    title: string;
    value: number;
  };
  titleBackground?: string;
  titleBorderRadius?: number;
  buttonBackground?: string;
  buttonBorderRadius?: number;
  buttonColor?: string;
  buttonFont?: string;
  buttonFontStyle?: string;
  buttonFontVariant?: string;
  buttonFontWeight?: number;
  buttonFontSize?: number;
  buttonLineHeight?: number;
  buttonFontFamily?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: [number, number, number, string][];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDraftShop extends IMLDraftContent, IMLTextProperties {
  type: MLContentType.SHOP;
  grid: '1fr' | '1fr 1fr' | '1fr 1fr 1fr';
  gap?: number;
  cells: {
    order: number;
    href?: string;

    image: Nullable<string>;
    background?: string;

    title: string;
    subtitle?: string;
    description?: string;
    price?: string;
    button?: string;
  }[];
  subtitleColor?: string;
  subtitleFont?: string;
  subtitleFontStyle?: string;
  subtitleFontVariant?: string;
  subtitleFontWeight?: number;
  subtitleFontSize?: number;
  subtitleLineHeight?: number;
  subtitleFontFamily?: string;
  subtitleLetterSpacing?: number;
  subtitleTextShadow?: [number, number, number, string][];
  subtitleAlign?: 'right' | 'left' | 'center' | 'justify';

  descriptionColor?: string;
  descriptionFont?: string;
  descriptionFontStyle?: string;
  descriptionFontVariant?: string;
  descriptionFontWeight?: number;
  descriptionFontSize?: number;
  descriptionLineHeight?: number;
  descriptionFontFamily?: string;
  descriptionLetterSpacing?: number;
  descriptionTextShadow?: [number, number, number, string][];
  descriptionAlign?: 'right' | 'left' | 'center' | 'justify';

  priceColor?: string;
  priceFont?: string;
  priceFontStyle?: string;
  priceFontVariant?: string;
  priceFontWeight?: number;
  priceFontSize?: number;
  priceLineHeight?: number;
  priceFontFamily?: string;
  priceLetterSpacing?: number;
  priceTextShadow?: [number, number, number, string][];
  priceAlign?: 'right' | 'left' | 'center' | 'justify';

  buttonBackground?: string;
  buttonBorderRadius?: number;
  buttonColor?: string;
  buttonFont?: string;
  buttonFontStyle?: string;
  buttonFontVariant?: string;
  buttonFontWeight?: number;
  buttonFontSize?: number;
  buttonLineHeight?: number;
  buttonFontFamily?: string;
  buttonLetterSpacing?: number;
  buttonTextShadow?: [number, number, number, string][];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';
}

export interface IMLDraftDivider extends Omit<IMLDraftContent, 'borderRadius'> {
  type: MLContentType.DIVIDER;
  icon?: TIconName;
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: string;
  secondaryOpacity?: string;
  line?: 'solid' | 'faded';
  lineColor?: string;
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

export type TMLImageContentCarousel<TImage> = {
  order: number;
  images: Nullable<TImage>[];
};

export type TMLImageContentImageText<TImage> = {
  order: number;
  image: Nullable<TImage>;
};

export type TMLImageContentButton<TImage> = {
  order: number;
  image: Nullable<TImage>;
};

export type TMLImageContentLink<TImage> = {
  order: number;
  image: Nullable<TImage>;
};

export type TMLImageContentShop<TImage> = {
  order: number;
  cells: Nullable<TImage>[];
};
