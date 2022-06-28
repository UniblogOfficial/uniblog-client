import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftShop extends IMLDraftContent, IMLTextProperties {
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
  subtitleTextShadow?: string[];
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
  descriptionTextShadow?: string[];
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
  priceTextShadow?: string[];
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
  buttonTextShadow?: string[];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';
}

export class MLDraftShop extends MLDraftAnyTextBlock<MLContentType.SHOP> implements IMLDraftShop {
  type: MLContentType.SHOP = MLContentType.SHOP;
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
  subtitleTextShadow?: string[];
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
  descriptionTextShadow?: string[];
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
  priceTextShadow?: string[];
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
  buttonTextShadow?: string[];
  buttonAlign?: 'right' | 'left' | 'center' | 'justify';

  constructor(props: IMLDraftShop) {
    super(props);
    this.grid = props.grid;
    this.cells = props.cells;
    Object.assign(this, props);
  }
}
