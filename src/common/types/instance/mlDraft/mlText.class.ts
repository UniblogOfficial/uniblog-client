import { Nullable } from '..';

import { IMLTextProperties, MLDraftAnyTextBlock } from './abstract/mlAnyTextBlock.class';
import { IMLDraftContent } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';
import { TIconName } from 'ui/components/modules/iconSpritesMaps/IconSpritesMap';

export interface IMLDraftText extends IMLDraftContent, IMLTextProperties {
  text: Nullable<string>;
  href?: string;
  icon?: TIconName;
  iconPosition?: 'sticky' | 'aside';
  iconSide?: 'right' | 'left';
}

export class MLDraftText extends MLDraftAnyTextBlock<MLContentType.TEXT> implements IMLDraftText {
  type: MLContentType.TEXT = MLContentType.TEXT;
  text: Nullable<string>;
  href?: string;
  icon?: TIconName;
  iconPosition?: 'aside' | 'sticky';
  iconSide?: 'right' | 'left';
  constructor(props: IMLDraftText) {
    super(props);
    this.text = props.text;
    this.href = props.href;
    this.icon = props.icon;
    this.iconPosition = props.iconPosition;
    this.iconSide = props.iconSide;
  }
}
