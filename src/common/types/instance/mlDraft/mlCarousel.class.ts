import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftCarousel extends Omit<IMLDraftContent, 'borderRadius'> {
  images: Nullable<string>[];
  links?: string[];
  titles?: string[];
  dots?: boolean;
  swipe?: boolean;
  arrows?: boolean;
  interval?: number;
  itemsPerView?: number;
}

export class MLDraftCarousel
  extends MLDraftBlock<MLContentType.CAROUSEL>
  implements IMLDraftCarousel
{
  type: MLContentType.CAROUSEL = MLContentType.CAROUSEL;
  images: Nullable<string>[];
  links?: string[];
  titles?: string[];
  dots?: boolean = false;
  swipe?: boolean = true;
  arrows?: boolean = false;
  interval?: number;
  itemsPerView?: number;
  constructor(props: IMLDraftCarousel) {
    super(props);
    this.images = props.images;
    this.links = props.links;
    this.titles = props.titles;
    this.dots = props.dots;
    this.swipe = props.swipe;
    this.arrows = props.arrows;
    this.interval = props.interval;
    this.itemsPerView = props.itemsPerView;
  }
}
