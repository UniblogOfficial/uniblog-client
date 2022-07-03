import React, { CSSProperties, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { getTemplates } from './templates';

import { setMLDraftTemplate } from 'bll/reducers';
import { ID, MLContentType } from 'common/constants';
import { useAppDispatch, useEffectOnce } from 'common/hooks';
import { TUser } from 'common/types/instance';
import { parseRawImage, px } from 'common/utils/ui';
import socials from 'img/socials';
import { Carousel, Icon } from 'ui/components/elements';
import {
  MLAudio,
  MLButton,
  MLImage,
  MLImageText,
  MLLink,
  MLLogo,
  MLShop,
  MLSocial,
  MLText,
  MLVideo,
  MLVote,
} from 'ui/components/modules/mlBlocks';
import { MLWidget } from 'ui/components/modules/mlBlocks/mlWidget/MLWidget';

type TMLTemplateProps = {
  userData: TUser;
  currentMLTemplate: number;
};

export const MLTemplate = ({ userData, currentMLTemplate }: TMLTemplateProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation(['pages', 'common']);
  const { name, avatar } = userData;
  const [templates, setTemplates] = useState(getTemplates(name, avatar));
  const [dots, setDots] = useState(true);
  const [arrows, setArrows] = useState(false);

  const setCurrentTemplate = useCallback(
    (stage: number) => {
      if (templates.some((_t, i) => i === stage)) {
        dispatch(setMLDraftTemplate({ templates, index: stage }));
      }
    },
    [dispatch, templates],
  );

  useEffectOnce(() => {
    dispatch(setMLDraftTemplate({ templates, index: 0 }));
  });

  const getTemplateLayouts = useCallback(
    () =>
      templates.map((template, i) => (
        <ul key={ID[i]} className="ml-template">
          {template.map((block, j) => {
            switch (block.type) {
              case MLContentType.TEXT:
                return <MLText key={ID[j]} id="" block={block} />;

              case MLContentType.SOCIAL:
                return <MLSocial key={ID[j]} id="" block={block} />;
              /* case MLContentType.WIDGET:
                return block && <MLWidget key={ID[j]} block={block} />;

              case MLContentType.VIDEO:
                return <MLVideo key={ID[j]} block={block} />; */

              /* case MLContentType.AUDIO:
                return block && <>audio block</>; */

              /* case MLContentType.VOTE:
                return block && <MLVote key={ID[j]} block={block} />;я

              case MLContentType.LOGO:
                // variable image is one or set of images of current block
                return block && <MLLogo key={ID[j]} id="" block={block} images={null} />;

              case MLContentType.LINK:
                return <MLLink key={ID[j]} id="" block={block} image={null} />;

              /* case MLContentType.BUTTON:
                return <MLButton key={ID[j]} block={block} />;

              case MLContentType.IMAGE:
                return <MLImages key={ID[j]} block={block} images={null} />; */

              case MLContentType.IMAGETEXT:
                return <MLImageText key={ID[j]} id="" block={block} image={null} />;

              /* case MLContentType.SHOP:
                return <MLShop key={ID[j]} block={block} images={null} />; */

              default:
                return <li key={ID[j]} />;
            }
          })}
        </ul>
      )),
    [templates],
  );

  const carouselArrows = useMemo(
    () => [
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
    ],
    [],
  );
  return (
    <div className="multilink-editor__constructor">
      <Carousel
        items={getTemplateLayouts()}
        itemsPerView={1}
        dots={dots}
        arrows={arrows}
        arrowsIcons={carouselArrows}
        arrowStep={1}
        className="carousel"
        transitionTime={200}
        callback={setCurrentTemplate}
        currentMLTemplate={currentMLTemplate}
      />
    </div>
  );
};
