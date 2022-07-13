import { TMLImageContentTimer } from '../mlDraft';

import { Nullable, TImageFile } from 'common/types/instance';

export class MLImageContentTimer implements TMLImageContentTimer<TImageFile> {
  order: number;
  image: Nullable<TImageFile>;
  constructor(props: TMLImageContentTimer<TImageFile>) {
    this.order = props.order;
    this.image = props.image;
  }
}
