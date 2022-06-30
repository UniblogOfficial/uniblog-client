import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftPost extends Omit<IMLDraftContent, 'borderRadius'> {
  url: Nullable<string>;
}

export class MLDraftPost extends MLDraftBlock<MLContentType.POST> implements IMLDraftPost {
  type: MLContentType.POST = MLContentType.POST;
  url: Nullable<string>;
  constructor(props: IMLDraftPost) {
    super(props);
    this.url = props.url;
  }
}
