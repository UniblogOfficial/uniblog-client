import React from 'react';

import { IMLDraftLink, Nullable } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLLinkProps = {
  block: Nullable<IMLDraftLink>;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLLink = ({ block, isPublic, callback }: TMLLinkProps) => {
  if (!block) return null;
  const className = callback ? 'ml-link interactive' : 'ml-link';
  const style = {
    padding: px(block.padding) ?? '0',
    textAlign: block.align,
    fontSize: block.fontSize,
    fontWeight: block.fontWeight,
    fontStyle: block.fontStyle,
    fontVariant: block.fontVariant,
    lineHeight: block.lineHeight,
    fontFamily: block.fontFamily,
    font: block.font,
    color: block.color,
    background: block.background,
    letterSpacing: block.letterSpacing,
    textShadow: block.textShadow?.join('px '),
    borderRadius: px(block.borderRadius),
  };
  return (
    <section
      className={className}
      style={{
        margin: px(block.margin) ?? '0',
        justifyContent: block.align,
      }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      {isPublic ? (
        <a href={block.href ?? '#'} style={style}>
          {block.title}
        </a>
      ) : (
        <div style={style}>{block.title}</div>
      )}
    </section>
  );
};
