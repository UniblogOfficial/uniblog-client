import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType, SocialNetwork, SocialService } from 'common/constants';

export interface IMLDraftSocial extends Omit<IMLDraftContent, 'borderRadius'> {
  links: string[];
  linkTypes: (SocialNetwork | SocialService)[];
  size?: number;
}

export class MLDraftSocial extends MLDraftBlock<MLContentType.SOCIAL> implements IMLDraftSocial {
  type: MLContentType.SOCIAL = MLContentType.SOCIAL;
  links: string[];
  linkTypes: (SocialNetwork | SocialService)[];
  size?: number;
  constructor(props: IMLDraftSocial) {
    super(props);
    this.links = props.links;
    this.linkTypes = props.linkTypes;
    this.size = props.size;
  }
}
