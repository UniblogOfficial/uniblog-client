import { Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';

export class MLImageContentImage implements TMLImageContentImage<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentImage<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
