import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftWidget extends Omit<IMLDraftContent, 'borderRadius'> {
  url: Nullable<string>;
  width: number;
  height: number;
}

export class MLDraftWidget extends MLDraftBlock<MLContentType.WIDGET> implements IMLDraftWidget {
  type: MLContentType.WIDGET = MLContentType.WIDGET;
  url: Nullable<string>;
  width: number;
  height: number;
  constructor(props: IMLDraftWidget) {
    super(props);
    this.url = props.url;
    this.width = props.width;
    this.height = props.height;
  }
}
