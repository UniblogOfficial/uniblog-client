import { Nullable, TImageFile, TMLImageContentLink } from 'common/types/instance';

export class MLImageContentLink implements TMLImageContentLink<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentLink<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
