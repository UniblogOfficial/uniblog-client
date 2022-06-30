import React from 'react';

import { MLDraftVideo } from 'common/types/instance';
import { px } from 'common/utils/ui';

type TMLVideoProps = {
  id: string;
  block: MLDraftVideo;
  callback?: <T>(payload: T) => void;
};

export const MLVideo = ({ id, block, callback }: TMLVideoProps) => {
  if (!block) return null;
  const className = callback ? 'ml-video interactive' : 'ml-video';
  return (
    <section className={className} style={{ padding: px(block.padding) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <div className="ml-video__container">
        <iframe
          src={block.url ?? ''}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
};
