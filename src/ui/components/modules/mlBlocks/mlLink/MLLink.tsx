import React, { CSSProperties } from 'react';

import imgPlaceholder from '../../../../../img/img-placeholder.png';

import {
  IMLDraftLink,
  MLDraftLink,
  Nullable,
  TImageFile,
  TMLImageContentImage,
  TMLImageContentLink,
} from 'common/types/instance';
import { px } from 'common/utils/ui';
import { getMLBlockTextProperties } from 'common/utils/ui/styleAssemblers';

type TMLLinkProps = {
  id: string;
  block: MLDraftLink;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
  image: Nullable<TMLImageContentLink<TImageFile>>;
};

export const MLLink = ({ id, block, isPublic, callback, image }: TMLLinkProps) => {
  const className = callback ? 'ml-link interactive' : 'ml-link';
  const imgSrc = image?.image ? image.image.previewUrl : block.image ?? undefined;
  const style: CSSProperties = {
    position: 'relative',
    ...getMLBlockTextProperties(block),
    background: block.background,
    borderRadius: px(block.borderRadius),
  };

  return (
    <section
      className={className}
      style={{
        margin: px(block.margin) ?? '0',
        justifyContent: block.textAlign,
      }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      {isPublic ? (
        <a href={block.href ?? '#'} style={style}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt="link icon"
              style={{
                width: 'auto',
                maxWidth: '25%',
                top: 0,
                left: 0,
                transform: 'none',
                padding: px(block.imageMargin),
              }}
            />
          )}
          <div style={{ padding: px(block.padding) ?? '0', flex: '1 0 100%' }}>{block.title}</div>
        </a>
      ) : (
        <div style={style}>
          {imgSrc && (
            <img
              src={imgSrc}
              alt="link icon"
              style={{
                width: 'auto',
                maxWidth: '25%',
                top: 0,
                left: 0,
                transform: 'none',
                padding: px(block.imageMargin),
              }}
            />
          )}
          <div style={{ padding: px(block.padding) ?? '0', flex: '1 0 100%' }}>{block.title}</div>
        </div>
      )}
    </section>
  );
};
