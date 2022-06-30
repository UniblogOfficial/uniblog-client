import { IMLDraftContent, MLDraftBlock } from './abstract/mlBlock.class';

import { MLContentType } from 'common/constants';
import { TIconName } from 'ui/components/modules/iconSpritesMaps/IconSpritesMap';

export interface IMLDraftDivider extends Omit<IMLDraftContent, 'borderRadius'> {
  icon?: TIconName;
  primaryColor?: string;
  secondaryColor?: string;
  line?: 'solid' | 'faded';
  lineColor?: string;
}

export class MLDraftDivider extends MLDraftBlock<MLContentType.DIVIDER> implements IMLDraftDivider {
  type: MLContentType.DIVIDER = MLContentType.DIVIDER;
  icon?: TIconName;
  primaryColor?: string;
  secondaryColor?: string;
  line?: 'solid' | 'faded';
  lineColor?: string;
  constructor(props: IMLDraftDivider) {
    super(props);
    this.icon = props.icon;
    Object.assign(this, props);
  }
}
