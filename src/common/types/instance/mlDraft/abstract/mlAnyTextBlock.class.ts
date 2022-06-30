import { IMLDraftContent, MLDraftBlock } from './mlBlock.class';

export interface IMLTextProperties {
  color?: string;
  // font must contain size & family;
  // all props: font-style font-variant font-weight font-size/line-height font-family
  // exm. #1: italic small-caps bold 12px/30px Georgia, serif;
  // exm. #2: 20px Arial, sans-serif; <= required
  font?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  letterSpacing?: number;
  // textShadow?: [number, number, number, string][]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
  textShadow?: string[]; // 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;
  textAlign?: 'right' | 'left' | 'center' | 'justify';
}

interface IMLDraftAnyTextBlock extends IMLDraftContent, IMLTextProperties {}

export abstract class MLDraftAnyTextBlock<BlockType>
  extends MLDraftBlock<BlockType>
  implements IMLDraftAnyTextBlock
{
  abstract type: BlockType;
  color?: string;
  font?: string;
  fontStyle?: string;
  fontVariant?: string;
  fontWeight?: number;
  fontSize?: number;
  lineHeight?: number;
  fontFamily?: string;
  letterSpacing?: number;
  textShadow?: string[];
  textAlign?: 'right' | 'left' | 'center' | 'justify';
  constructor(props: IMLDraftAnyTextBlock) {
    super(props);
    this.color = props.color;
    this.font = props.font;
    this.fontStyle = props.fontStyle;
    this.fontVariant = props.fontVariant;
    this.fontWeight = props.fontWeight;
    this.fontSize = props.fontSize;
    this.lineHeight = props.lineHeight;
    this.fontFamily = props.fontFamily;
    this.letterSpacing = props.letterSpacing;
    this.textShadow = props.textShadow;
    this.textAlign = props.textAlign;
  }
}
