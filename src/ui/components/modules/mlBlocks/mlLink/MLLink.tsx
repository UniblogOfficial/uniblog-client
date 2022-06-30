import React from 'react';

import {
  IMLDraftLink,
  MLDraftLink,
  Nullable,
  TImageFile,
  TMLImageContentImage,
  TMLImageContentLink,
} from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLLinkProps = {
  id: string;
  block: MLDraftLink;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
  image: Nullable<TMLImageContentLink<TImageFile>>;
};

export const MLLink = ({ id, block, isPublic, callback, image }: TMLLinkProps) => {
  const className = callback ? 'ml-link interactive' : 'ml-link';
  const style = {
    padding: px(block.padding) ?? '0',
    textAlign: block.textAlign,
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
  const imgSrc = image?.image ? image.image.previewUrl : block.image ?? undefined;
  return (
    <section
      className={className}
      style={{
        margin: px(block.margin) ?? '0',
        justifyContent: block.textAlign,
        position: 'relative',
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      {isPublic ? (
        <a href={block.href ?? '#'} style={style}>
          {imgSrc && <img src={imgSrc} alt="link icon" style={{ marginLeft: '-126px' }} />}
          {block.title}
        </a>
      ) : (
        <div style={style}>
          <div>
            {imgSrc && <img src={imgSrc} alt="link icon" style={{ marginLeft: '-126px' }} />}
            {block.title}
          </div>
        </div>
      )}
    </section>
  );
};
