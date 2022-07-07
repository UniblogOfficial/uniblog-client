import React from 'react';

import { ID } from 'common/constants';
import { MLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { px } from 'common/utils/ui';
import imgPlaceholder from 'img/img-placeholder.png';

type TMLImageProps = {
  id: string;
  block: MLDraftImage;
  image: Nullable<TMLImageContentImage<TImageFile>>;
  isPublic?: boolean;
  callback?: <T>(payload: T) => void;
};

export const MLImage = ({ id, block, image, isPublic, callback }: TMLImageProps) => {
  if (!block) return null;

  const className = callback ? 'interactive' : undefined;
  const imgSrc = image?.image ? image.image.previewUrl : block.image ?? imgPlaceholder;
  return (
    <section
      className={className}
      style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <div className="ml-images">
        {isPublic && block.href ? (
          <a href={block.href ?? '#'}>
            <div className="ml-images__image">
              <img src={imgSrc} alt="" />
            </div>
          </a>
        ) : (
          <div className="ml-images__image">
            <img src={imgSrc} alt="" />
          </div>
        )}
      </div>
    </section>
  );
};
