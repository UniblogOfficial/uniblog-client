import { CSSProperties } from 'react';

import { TMLDraftTextBlocksUnion } from 'common/types/instance/mlDraft';

export const getMLBlockTextProperties = (block: TMLDraftTextBlocksUnion): CSSProperties => ({
  color: block.color,
  fontStyle: block.fontStyle,
  fontVariant: block.fontVariant,
  fontWeight: block.fontWeight,
  fontSize: block.fontSize ?? 18,
  lineHeight: block.lineHeight,
  fontFamily: block.fontFamily,
  letterSpacing: block.letterSpacing,
  textShadow: block.textShadow?.length
    ? block.textShadow.reduce((acc, el, i) => `${acc}, ${el}`)
    : undefined,
  textAlign: block.textAlign,
});
