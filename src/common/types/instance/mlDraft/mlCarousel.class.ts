import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftCarousel extends Omit<IMLDraftContent, 'borderRadius'> {
  images: Nullable<string>[];
  dots?: boolean;
  swipe?: boolean;
  arrows?: boolean;
  interval?: number;
}

export class MLDraftCarousel
  extends MLDraftBlock<MLContentType.CAROUSEL>
  implements IMLDraftCarousel
{
  type: MLContentType.CAROUSEL = MLContentType.CAROUSEL;
  images: Nullable<string>[];
  dots?: boolean = false;
  swipe?: boolean = true;
  arrows?: boolean = false;
  interval?: number;
  constructor(props: IMLDraftCarousel) {
    super(props);
    this.images = props.images;
    this.dots = props.dots;
    this.swipe = props.swipe;
    this.arrows = props.arrows;
    this.interval = props.interval;
  }
}
