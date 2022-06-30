import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType, SocialNetwork, SocialService } from 'common/constants';

export interface IMLDraftLink extends IMLDraftContent, IMLTextProperties {
  href: Nullable<string>;
  linkType: Nullable<(SocialNetwork | SocialService) | 'third-party'>;
  title: Nullable<string>;
  image?: Nullable<string>;
}

export class MLDraftLink extends MLDraftAnyTextBlock<MLContentType.LINK> implements IMLDraftLink {
  type: MLContentType.LINK = MLContentType.LINK;
  href: Nullable<string>;
  linkType: Nullable<(SocialNetwork | SocialService) | 'third-party'>;
  title: Nullable<string>;
  image?: Nullable<string>;
  constructor(props: IMLDraftLink) {
    super(props);
    this.href = props.href;
    this.linkType = props.linkType;
    this.title = props.title;
    this.image = props.image;
  }
}
