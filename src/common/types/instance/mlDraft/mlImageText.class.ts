import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftImageText extends IMLDraftContent, Omit<IMLTextProperties, 'textAlign'> {
  image: Nullable<string>;
  imgPosition: 'right' | 'left';
  text: Nullable<string>;
  hAlign?: 'right' | 'left' | 'center' | 'justify';
  vAlign?: 'top' | 'center' | 'bottom';
}

export class MLDraftImageText
  extends MLDraftAnyTextBlock<MLContentType.IMAGETEXT>
  implements IMLDraftImageText
{
  type: MLContentType.IMAGETEXT = MLContentType.IMAGETEXT;
  image: Nullable<string>;
  imgPosition: 'right' | 'left';
  text: Nullable<string>;
  hAlign?: 'right' | 'left' | 'center' | 'justify' = 'right';
  vAlign?: 'top' | 'center' | 'bottom' = 'top';
  constructor(props: IMLDraftImageText) {
    super(props);
    this.image = props.image;
    this.imgPosition = props.imgPosition;
    this.text = props.text;
    this.hAlign = props.hAlign;
    this.vAlign = props.vAlign;
  }
}
