// primary class
export interface IMLDraftContent {
  isFilled: boolean;
  padding?: [number, number, number, number];
  margin?: [number, number, number, number];
  background?: string;
  borderRadius?: number[];
}

export abstract class MLDraftBlock<TBlockType> implements IMLDraftContent {
  abstract type: TBlockType;
  isFilled: boolean;
  isTouched = false;
  padding?: [number, number, number, number];
  margin?: [number, number, number, number];
  background?: string;
  borderRadius?: number[];
  constructor(props: IMLDraftContent) {
    this.isFilled = props.isFilled;
    this.padding = props.padding;
    this.margin = props.margin;
    this.background = props.background;
    this.borderRadius = props.borderRadius;
  }
}
