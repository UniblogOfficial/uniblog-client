import React, { CSSProperties } from 'react';

import {
  IMLDraftImageText,
  MLDraftImageText,
  Nullable,
  TImageFile,
  TMLImageContentImageText,
} from 'common/types/instance';
import { px } from 'common/utils/ui';
import imgPlaceholder from 'img/img-placeholder.png';

type TMLImageTextProps = {
  id: string;
  block: MLDraftImageText;
  image: Nullable<TMLImageContentImageText<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLImageText = ({ id, block, image, callback }: TMLImageTextProps) => {
  if (!block) return null;
  const imgMargin = (imageTextBlock: IMLDraftImageText) => {
    switch (imageTextBlock.imgPosition) {
      case 'left':
        return '0 12px 12px 0';
      case 'right':
        return '0 0 12px 12px';
      default:
        return '0';
    }
  };
  const imgSrc = image?.image ? image.image.previewUrl : block.image ?? imgPlaceholder;
  const className = callback ? 'interactive' : undefined;
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <div className="ml-imagetext">
        <div
          className="ml-imagetext__image"
          style={{
            float: block.imgPosition as CSSProperties['float'],
            margin: imgMargin(block),
          }}>
          <img src={imgSrc} alt="" />
        </div>
        <p className="ml-imagetext__text">{block.text}</p>
      </div>
    </section>
  );
};
