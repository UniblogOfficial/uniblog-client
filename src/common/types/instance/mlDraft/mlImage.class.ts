import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType, SocialNetwork, SocialService } from 'common/constants';

export interface IMLDraftImage extends IMLDraftContent, IMLTextProperties {
  image: Nullable<string>;
  title?: string;
  href?: string;
  imgPosition: 'top' | 'bottom';
  textPosition: 'inside' | 'outside';
}

export class MLDraftImage
  extends MLDraftAnyTextBlock<MLContentType.IMAGE>
  implements IMLDraftImage
{
  type: MLContentType.IMAGE = MLContentType.IMAGE;
  image: Nullable<string>;
  title?: string;
  href?: string;
  imgPosition: 'top' | 'bottom' = 'bottom';
  textPosition: 'inside' | 'outside' = 'outside';
  constructor(props: IMLDraftImage) {
    super(props);
    this.image = props.image;
    this.title = props.title;
    this.href = props.href;
    this.imgPosition = props.imgPosition;
    this.textPosition = props.textPosition;
  }
}
