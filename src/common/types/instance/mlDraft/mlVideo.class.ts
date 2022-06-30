import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftVideo extends Omit<IMLDraftContent, 'borderRadius'> {
  url: Nullable<string>;
  width?: number;
  height?: number;
}

export class MLDraftVideo extends MLDraftBlock<MLContentType.VIDEO> implements IMLDraftVideo {
  type: MLContentType.VIDEO = MLContentType.VIDEO;
  url: Nullable<string>;
  width?: number;
  height?: number;
  constructor(props: IMLDraftVideo) {
    super(props);
    this.url = props.url;
    this.width = props.width;
    this.height = props.height;
  }
}
