import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';

export interface IMLDraftButton extends IMLDraftContent, IMLTextProperties {
  href: Nullable<string>;
  title: Nullable<string>;
  image?: string;
}

export class MLDraftButton
  extends MLDraftAnyTextBlock<MLContentType.BUTTON>
  implements IMLDraftButton
{
  type: MLContentType.BUTTON = MLContentType.BUTTON;
  href: Nullable<string>;
  title: Nullable<string>;
  image?: string;
  constructor(props: IMLDraftButton) {
    super(props);
    this.href = props.href;
    this.title = props.title;
    this.image = props.image;
  }
}
