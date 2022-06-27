import { Nullable } from '..';

import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftAudio extends Omit<IMLDraftContent, 'borderRadius'> {
  url: Nullable<string>;
}

export class MLDraftAudio extends MLDraftBlock<MLContentType.AUDIO> implements IMLDraftAudio {
  type: MLContentType.AUDIO = MLContentType.AUDIO;
  url: Nullable<string>;
  constructor(props: IMLDraftAudio) {
    super(props);
    this.url = props.url;
  }
}
