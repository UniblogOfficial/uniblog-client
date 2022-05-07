import React, { FC, useCallback } from 'react';

import { Carousel, Icon } from '../../../../components/elements';

type TMLTemplateProps = {
  setTemplate: (template: number[]) => void;
};

const multilinkTemplates = new Map([
  [0, [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]],
  [1, [25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]],
  [2, [50, 25, 12.5, 12.5]],
  [3, [25, 25, 12.5, 12.5, 12.5, 12.5]],
]);

export const MLTemplate: FC<TMLTemplateProps> = ({ setTemplate }) => {
  const setCurrentTemplate = useCallback(
    (stage: number) => {
      const template = multilinkTemplates.get(stage);
      if (template) {
        setTemplate(template);
      }
    },
    [setTemplate],
  );
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
          callback={setCurrentTemplate}
        />
      </div>
    </>
  );
};

const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const templates = Array.from(multilinkTemplates.values()).map((template, i) => (
  <ul key={id[i]} className="template">
    {template.map((block, j) => (
      <li key={id[j]} style={{ flex: `0 1 ${block}%` }} className="template__block" />
    ))}
  </ul>
));
