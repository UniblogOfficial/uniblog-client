import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftLogo extends Omit<IMLDraftContent, 'borderRadius'> {
  logo: Nullable<string>;
  banner?: Nullable<string>;
  size: Nullable<number>;
  hAlign?: 'right' | 'left' | 'center';
  vAlign?: 'center' | 'bottom';
}

export class MLDraftLogo extends MLDraftBlock<MLContentType.LOGO> implements IMLDraftLogo {
  type: MLContentType.LOGO = MLContentType.LOGO;
  logo: Nullable<string>;
  banner?: Nullable<string>;
  size: Nullable<number>;
  hAlign?: 'right' | 'left' | 'center';
  vAlign?: 'center' | 'bottom';
  constructor(props: IMLDraftLogo) {
    super(props);
    this.logo = props.logo;
    this.banner = props.banner;
    this.size = props.size;
    this.hAlign = props.hAlign;
    this.vAlign = props.vAlign;
  }
}
