import React, { FC } from 'react';
import 'react-h5-audio-player/lib/styles.css';

import styles from './MLCarousel.module.scss';

import { MLDraftCarousel, Nullable, TImageFile } from 'common/types/instance';
import { TMLImageContentCarousel } from 'common/types/instance/mlDraft/mlDraft';
import { Carousel, Icon } from 'ui/components/elements';

type TMLCarouselProps = {
  id: string;
  block: MLDraftCarousel;
  image?: Nullable<TMLImageContentCarousel<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLCarousel: FC<TMLCarouselProps> = ({ id, block, image, callback }) => {
  const imagesSrc = image?.images?.length ? image.images.map(img => img?.previewUrl) : block.images;
  if (!block) return null;

  const carouselArrows = [
    <div key="arrow1">
      <Icon
        name="chevron"
        side="left"
        size="max"
        rotate={180}
        containerClassName="carousel-arrow"
      />
    </div>,
    <div key="arrow2">
      <Icon name="chevron" side="right" size="max" containerClassName="carousel-arrow" />
    </div>,
  ];

  return (
    <div className={styles.cont}>
      <Carousel
        items={imagesSrc.map((img, index) => (
          <div className={styles.container} key={index.toString() + img}>
            {img && (
              <img
                src={img}
                alt="#"
                style={{ marginLeft: '310px', width: '250px', height: '250px', paddingTop: '20px' }}
              />
            )}
          </div>
        ))}
        itemsPerView={1}
        dots={block.dots}
        arrows={block.arrows}
        arrowStep={1}
        className={styles.cont}
        interval={block.interval}
        arrowsIcons={carouselArrows}
      />
    </div>
  );
};
