import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftVote extends Omit<IMLDraftContent, 'borderRadius'>, IMLTextProperties {
  cells: {
    order: number;
    title: string;
    value: number;
  }[];
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
  buttonTextShadow?: string[];
  buttonTextAlign?: 'right' | 'left' | 'center' | 'justify';
}

export class MLDraftVote extends MLDraftAnyTextBlock<MLContentType.VOTE> implements IMLDraftVote {
  type: MLContentType.VOTE = MLContentType.VOTE;
  cells: {
    order: number;
    title: string;
    value: number;
  }[];
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
  buttonTextShadow?: string[];
  buttonTextAlign?: 'right' | 'left' | 'center' | 'justify';
  constructor(props: IMLDraftVote) {
    super(props);
    this.cells = props.cells;
    Object.assign(this, props);
  }
}
