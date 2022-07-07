import { Nullable, TImageFile, TMLImageContentCarousel } from 'common/types/instance';

export class MLImageContentCarousel implements TMLImageContentCarousel<TImageFile> {
  order: number;
  images: Nullable<TImageFile>[];
  constructor(props: TMLImageContentCarousel<TImageFile>) {
    this.order = props.order;
    this.images = props.images;
  }
}
