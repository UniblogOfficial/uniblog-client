import { MLDraftBlock, Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftTimer extends IMLDraftContent, IMLTextProperties {
  image: Nullable<string>;
  title: Nullable<string>;
  href: string;
  countdown: number;
  imgPosition?: 'top' | 'bottom';
  textPosition?: 'inside' | 'outside';
}

export class MLDraftTimer
  extends MLDraftAnyTextBlock<MLContentType.TIMER>
  implements IMLDraftTimer
{
  type: MLContentType.TIMER = MLContentType.TIMER;
  image: Nullable<string>;
  title: Nullable<string>;
  href: string;
  countdown: number;
  imgPosition?: 'top' | 'bottom';
  textPosition?: 'inside' | 'outside';
  constructor(props: IMLDraftTimer) {
    super(props);
    this.href = props.href;
    this.title = props.title;
    this.image = props.image;
    this.countdown = props.countdown;
    this.imgPosition = props.imgPosition;
    this.textPosition = props.textPosition;
  }
}
