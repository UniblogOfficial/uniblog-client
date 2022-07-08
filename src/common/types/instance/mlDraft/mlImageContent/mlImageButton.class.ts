import { Nullable, TImageFile, TMLImageContentButton } from 'common/types/instance';

export class MLImageContentButton implements TMLImageContentButton<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentButton<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
