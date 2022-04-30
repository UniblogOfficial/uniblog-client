import React from 'react';

import { Carousel, Icon } from '../../../../components/elements';

type TMLTemplateProps = {};

export const MLTemplate = () => {
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
    <>
      <h3 className="paper-title">Choose a template</h3>
      <div className="multilink-editor__constructor">
        <Carousel
          items={templates}
          itemsPerView={1}
          arrows={carouselArrows}
          arrowStep={1}
          className="carousel"
          transitionTime={200}
        />
      </div>
    </>
  );
};

const templates = [
  <ul key="1" className="template _1">
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
  </ul>,
  <ul key="2" className="template _2">
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
  </ul>,
  <ul key="3" className="template _3">
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
    <li>
      <div className="template__block" />
    </li>
  </ul>,
];
