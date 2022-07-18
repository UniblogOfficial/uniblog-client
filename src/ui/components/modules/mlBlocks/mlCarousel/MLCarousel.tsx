
import React, { FC, useState } from 'react';

import styles from './MLCarousel.module.scss';

import { ID } from 'common/constants';
import { MLDraftCarousel, Nullable, TImageFile } from 'common/types/instance';
import { TMLImageContentCarousel } from 'common/types/instance/mlDraft/mlDraft';
import { Carousel, Icon } from 'ui/components/elements';
import { px } from 'common/utils/ui';
import imgPlaceholder from 'img/img-placeholder.png';

type TMLCarouselProps = {
  id: string;
  block: MLDraftCarousel;
  image?: Nullable<TMLImageContentCarousel<TImageFile>>;
  callback?: <T>(payload: T) => void;
};

export const MLCarousel: FC<TMLCarouselProps> = ({ id, block, image, callback }) => {

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
  const className = callback ? 'interactive' : undefined;
  const images = image?.images ? image.images.map(data => data?.previewUrl) : block.images;
  const items = images.map((src, i) => (
    <div className={styles.container} key={ID[i]}>
      {src ? <img src={src} alt="item" /> : <img src={imgPlaceholder} alt="item" />}
      {block.titles && <div className={styles.title}>{block.titles[i]}</div>}
    </div>
  ));

  return (
    <section
      className={className}
      style={{ padding: px(block.padding) ?? '0', margin: px(block.margin) ?? '0' }}>
      {callback && <input type="button" data-type={block.type} data-id={id} onClick={callback} />}
      <Carousel
        items={items}
        itemsPerView={block.itemsPerView ?? 1}
        dots={block.dots}
        arrows={block.arrows}
        arrowStep={1}
        className={styles.container}
        transitionTime={300}
        interval={block.interval}
        arrowsIcons={carouselArrows}
      />
    </section>
  );
};
