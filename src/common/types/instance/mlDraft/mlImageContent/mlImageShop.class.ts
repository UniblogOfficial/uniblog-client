import { Nullable, TImageFile, TMLImageContentShop } from 'common/types/instance';

export class MLImageContentShop implements TMLImageContentShop<TImageFile> {
  order: number;
  cells: Nullable<TImageFile>[];
  constructor(props: TMLImageContentShop<TImageFile>) {
    this.order = props.order;
    this.cells = props.cells;
  }
}
