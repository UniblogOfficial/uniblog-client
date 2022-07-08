import React, { FC } from 'react';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import { TMLImageContentAudio } from '../../../../../common/types/instance/mlDraft/mlDraft';
import { px } from '../../../../../common/utils/ui';
import imgPlaceholder from '../../../../../img/img-placeholder.png';

import { MLDraftAudio, Nullable, TImageFile } from 'common/types/instance';

type TMLAudioProps = {
  id: string;
  block: MLDraftAudio;
  image?: Nullable<TMLImageContentAudio<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLAudio: FC<TMLAudioProps> = ({ id, block, image, callback }) => {
  const className = callback ? 'interactive' : undefined;
  const audioSrc = image?.image ? image.image.previewUrl : block.url ?? imgPlaceholder;
  if (!block) return null;
  return (
    <div>
      <section
        className={className}
        style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
        {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
        <div className="ml-images">
          <div className="ml-images__image">
            {/* @ts-ignore */}
            <AudioPlayer src={audioSrc} autoPlayAfterSrcChange={false} />
          </div>
        </div>
      </section>
    </div>
  );
};
