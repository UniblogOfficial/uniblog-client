import React from 'react';

import { ID } from '../../../../../common/constants';
import { IMLDraftContentImage, Nullable } from '../../../../../common/types/instance';
import { px } from '../../../../../common/utils/ui';

type TMLImagesProps = {
  block: Nullable<IMLDraftContentImage>;
  callback?: <T>(payload: T) => void;
};

export const MLImages = ({ block, callback }: TMLImagesProps) => {
  if (!block) return null;
  const className = callback ? 'interactive' : undefined;
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && (
        <input type="button" data-type={block.type} data-order={block.order} onClick={callback} />
      )}
      <div className="ml-images">
        {block.images.map((image, i) => (
          <div key={ID[i]} className="ml-images__image">
            <img src={image?.src} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};
