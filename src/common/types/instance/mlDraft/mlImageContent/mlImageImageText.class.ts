import { Nullable, TImageFile, TMLImageContentImageText } from 'common/types/instance';

export class MLImageContentImageText implements TMLImageContentImageText<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentImageText<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
