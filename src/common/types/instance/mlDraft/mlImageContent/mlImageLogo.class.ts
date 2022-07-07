import { Nullable, TImageFile, TMLImageContentLogo } from 'common/types/instance';

export class MLImageContentLogo implements TMLImageContentLogo<TImageFile> {
  order: number;
  logo: Nullable<TImageFile>;
  banner?: Nullable<TImageFile>;
  constructor(props: TMLImageContentLogo<TImageFile>) {
    this.order = props.order;
    this.logo = props.logo;
    this.banner = props.banner;
  }
}
