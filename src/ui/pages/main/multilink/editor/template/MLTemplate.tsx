import React, { FC, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { setMLDraftTemplate } from '../../../../../../bll/reducers';
import { useAppDispatch } from '../../../../../../common/hooks';
import { Carousel, Icon } from '../../../../../components/elements';

type TMLTemplateProps = {};

const multilinkTemplates = new Map([
  [0, [50, 25, 12.5, 12.5]], // sum of elements must be equal to 100
  [1, [40, 10, 40, 10]],
  [2, [25, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]],
  [3, [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]],
  [4, [25, 25, 12.5, 12.5, 12.5, 12.5]],
]);

export const MLTemplate = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const setCurrentTemplate = useCallback(
    (stage: number) => {
      const template = multilinkTemplates.get(stage);
      if (template) {
        dispatch(setMLDraftTemplate(template));
      }
    },
    [dispatch],
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
      <h3 className="paper-title">{t('pages:multilink.creation.stages.template')}</h3>
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
