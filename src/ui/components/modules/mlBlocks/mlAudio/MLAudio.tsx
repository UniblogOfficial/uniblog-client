import React from 'react';

// eslint-disable-next-line import/order
import { TMLImageContentAudio } from '../../../../../common/types/instance/mlDraft/mlDraft';

// @ts-ignore
import { px } from '../../../../../common/utils/ui';
import imgPlaceholder from '../../../../../img/img-placeholder.png';

import { MLDraftAudio, Nullable, TImageFile } from 'common/types/instance';

type TMLAudioProps = {
  id: string;
  block: MLDraftAudio;
  url?: Nullable<TMLImageContentAudio<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLAudio = ({ id, block, url, callback }: TMLAudioProps) => {
  const className = callback ? 'interactive' : undefined;
  const audioSrc = url?.url ? url.url.previewUrl : block.url ?? imgPlaceholder;
  if (!block) return null;
  return (
    <div>
      <section
        className={className}
        style={{ padding: px(block.padding) ?? '0', margin: px(block.padding) ?? '0' }}>
        {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
        <div className="ml-images">
          <div className="ml-images__image">
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio src={audioSrc} controls />
          </div>
        </div>
      </section>
    </div>
  );
};
