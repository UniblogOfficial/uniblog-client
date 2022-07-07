import { Nullable, TImageFile, TMLImageContentAudio } from 'common/types/instance';

export class MLImageContentAudio implements TMLImageContentAudio<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentAudio<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
