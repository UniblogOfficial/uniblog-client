import { Nullable } from '..';

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
