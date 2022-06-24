import React from 'react';

import { ID } from 'common/constants';
import { IMLDraftImage, Nullable, TImageFile, TMLImageContentImage } from 'common/types/instance';
import { px } from 'common/utils/ui';
import imgPlaceholder from 'img/img-placeholder.png';

type TMLImageProps = {
  block: Nullable<IMLDraftImage>;
  images: Nullable<TMLImageContentImage<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLImage = ({ block, images, callback }: TMLImageProps) => {
  if (!block) return null;
  const className = callback ? 'interactive' : undefined;
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div className="ml-images">
        {block.images &&
          block.images.map((image, i) => {
            const imgSrc = images?.images[i]
              ? images.images[i]?.previewUrl
              : image ?? imgPlaceholder;
            return (
              <div key={ID[i]} className="ml-images__image">
                <img src={imgSrc} alt="" />
              </div>
            );
          })}
      </div>
    </section>
  );
};
