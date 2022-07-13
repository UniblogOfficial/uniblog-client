import React, { FC, useState } from 'react';
import 'react-h5-audio-player/lib/styles.css';

import styles from './MLCarousel.module.scss';

import { MLDraftCarousel, Nullable, TImageFile } from 'common/types/instance';
import { TMLImageContentCarousel } from 'common/types/instance/mlDraft/mlDraft';
import { Carousel } from 'ui/components/elements';

type TMLCarouselProps = {
  id: string;
  block: MLDraftCarousel;
  image?: Nullable<TMLImageContentCarousel<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLCarousel: FC<TMLCarouselProps> = ({ id, block, image, callback }) => {
  const className = callback ? 'interactive' : undefined;
  const audioSrc = image?.images ? image.images : block.images ?? '';
  if (!block) return null;
  return (
    <div className={styles.cont}>
      <Carousel
        /* eslint-disable-next-line react/jsx-key */
        items={audioSrc.map((m, index) => (
          <div className={styles.container} key={index.toString() + m}>
            <img src={m as string} alt="#" />
          </div>
        ))}
        itemsPerView={1}
        dots={block.dots}
        arrows={block.arrows}
        arrowStep={1}
        className={styles.cont}
        transitionTime={300}
        interval={block.interval}
      />
    </div>
  );
};
